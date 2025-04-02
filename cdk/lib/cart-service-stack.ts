import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

import path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    console.log('POSTGRES_DB', process.env.POSTGRES_DB);

    const nestLambda = new NodejsFunction(this, 'NestJsLambda', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../dist/src/lambda.js'),
      timeout: cdk.Duration.seconds(30),
      environment: {
        NO_COLOR: '1',
        NODE_ENV: process.env.NODE_ENV || 'development',
        POSTGRES_DB: process.env.POSTGRES_DB!,
        POSTGRES_HOST: process.env.POSTGRES_HOST!,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
        POSTGRES_PORT: process.env.POSTGRES_PORT!,
        POSTGRES_USER: process.env.POSTGRES_USER!,
      },
      bundling: {
        externalModules: [
          'class-transformer',
          'class-validator',
          '@nestjs/websockets',
          '@nestjs/microservices',
        ],
        sourceMap: true,
      },
    });

    // Enable Lambda Function URL (Replaces API Gateway)
    const functionUrl = nestLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedHeaders: ['*'],
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
      },
    });

    new cdk.CfnOutput(this, 'CartLambdaUrl', {
      value: functionUrl.url,
    });
  }
}
