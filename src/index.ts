import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './schema';
import { Context, createContext } from './context';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { applyMiddleware } from 'graphql-middleware';
import { Authentication } from './plugins/authentication'

const start = async () => {

  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema: applyMiddleware(schema, Authentication),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000', 'https://studio.apollographql.com'],
    exposedHeaders: ['Set-Cookie', 'auth', '*', 'Access-Control-Allow-Origin'],
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.set('trust proxy', 1);

  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: createContext,
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
};

start().then(() => console.log('Graphql Server is running on http://localhost:4000/graphql'));
