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


const start = async () => {

  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(cors())

  app.use(
    '/graphql',
    expressMiddleware<Context>(server, {
      context: createContext,
    }),
  )

  app.use('/setHeaderCookie', (req, res) => {
    // set a fake auth cookie
    res.setHeader('Set-Cookie', 'auth=1; Path=/; HttpOnly');
    res.send('ok');
  });

  new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
};

start().then(() => console.log('Server is running on http://localhost:4000'));
