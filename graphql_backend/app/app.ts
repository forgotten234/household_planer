require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {ApolloServer} from "apollo-server-express";
import {expressMiddleware} from '@apollo/server/express4';
//import typeDefs from './api/schemas';
//import resolvers from './api/resolvers';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
//import {notFound, errorHandler} from './middlewares';

const app = express();

export default app;
