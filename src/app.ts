import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import Routes from '@/@universal/interfaces/route.interface';
import errorMiddleware from '@/@universal/middlewares/error.middleware';
import { logger, stream } from '@/@universal/logger';
import notFound from './@universal/middlewares/not-found.middleware';
import { connectMongo } from './@universal/mongo.database';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3111;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeRouteNotFound();
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    if (this.env !== 'test') {
      connectMongo()
        .then(connect => {
          this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors());
    } else {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

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
