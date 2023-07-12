import 'reflect-metadata';
import { AppDataSource } from './db';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { DesignResolvers } from '../resolvers/desigResolver';
import { salaryResolvers } from '../resolvers/salaryResolver';
import { UsersResolvers } from '../resolvers/UserResolvers';
import { dbConfig } from '../config/Config';

export async function server() {
  const schema = await buildSchema({
    resolvers: [UsersResolvers, DesignResolvers, salaryResolvers],
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.listen(dbConfig.port);
  console.log('🚀  Server has started! ');
  AppDataSource.initialize()
    .then(() => {
      console.log('Database has been initialized! 🌎  ');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}
