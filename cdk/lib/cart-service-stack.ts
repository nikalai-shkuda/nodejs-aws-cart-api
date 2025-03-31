import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import path = require('path');

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestLambda = new NodejsFunction(this, 'CartNestJsLambda', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/lambda.ts'),
      timeout: cdk.Duration.seconds(30),
      memorySize: 1024,
      bundling: {
        externalModules: [
          'class-transformer',
          'class-validator',
          '@nestjs/websockets',
          '@nestjs/microservices',
        ],
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
