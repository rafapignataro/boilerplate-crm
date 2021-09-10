import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import routes from './routes';

class App {
  public express: express.Application

  public constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    dotenv.config();
    this.express.use(express.json());
    this.express.use(cors());
  }

  private async database() {
    try {
      await createConnection();
      console.info('Connected to DB');
    } catch (err) {
      console.error('DB ERROR', err);
    }
  }

  private routes() {
    this.express.use(routes);
  }
}

export default new App().express;