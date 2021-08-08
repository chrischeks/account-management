import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { connect, set } from 'mongoose';
import morgan from 'morgan';
import compression from 'compression';
import Routes from '@/@universal/interfaces/route.interface';
import errorMiddleware from '@/@universal/middlewares/error.middleware';
import notFound from './@universal/middlewares/not-found.middleware';
import { dbConnection } from './@universal/database/mongo.database';
import { logger, stream } from './@universal/logger/logger';
import rateLimit = require('express-rate-limit');
import MongoStore = require('rate-limit-mongo');
import config from 'config';
const { MONGODB_URL, PORT, limiterConfig } = config.get('config');
const { max, expireTimeMs } = limiterConfig;

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  private limiter: any;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3111;
    this.env = process.env.NODE_ENV || 'development';
    this.connectToDatabase();
    this.initializeRatelimiter();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeRouteNotFound();
  }

  private initializeRatelimiter() {
    this.limiter = rateLimit({
      store: new MongoStore({
        uri: MONGODB_URL,
        expireTimeMs: Number(expireTimeMs),
        errorHandler: console.error.bind(null, 'rate-limit-mongo'),
      }),
      max: Number(max),
      windowMs: Number(expireTimeMs),
      message: `You have made too many server requests, try again in an hour`,
    });
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors());
    } else {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(this.limiter);
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initializeRouteNotFound() {
    this.app.use(notFound);
  }
}

export default App;
