import express from 'express';
import IndexRoutes from 'routes/index.routes';
import { PORT } from './config';


class App {
  private app = express();
  private indexRoutes = new IndexRoutes();

  constructor() {
    this.init();
  }

  init(): void {
    this.app.use(express.json());
    this.app.use('/', this.indexRoutes.router);
  }

  start(): void {
    this.app.listen(PORT);
    console.log(`Server on port ${PORT}`);
  }
}

new App().start();
