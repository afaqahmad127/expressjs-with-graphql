import 'reflect-metadata';
import {} from 'dotenv/config';
import { server } from './loaders/server';
import cors from 'cors';
import express from 'express';
const app = express();

export const startApplication = async () => {
  app.use(cors());
  await server();
};

startApplication();
