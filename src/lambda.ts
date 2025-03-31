import * as serverlessExpress from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyEvent, Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';

let cachedServer: Handler;

const bootstrapLambda = async (): Promise<Handler> => {
  if (!cachedServer) {
    const expressApp = express();
    const expressAdapter = new ExpressAdapter(expressApp);
    const nestApp = await NestFactory.create(AppModule, expressAdapter);

    await nestApp.init();

    cachedServer = serverlessExpress.configure({ app: expressApp });
    return cachedServer;
  }

  return cachedServer;
};

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<Handler> => {
  console.log('Nest lambda event', event);
  const server = await bootstrapLambda();
  return server(event, context, callback);
};
