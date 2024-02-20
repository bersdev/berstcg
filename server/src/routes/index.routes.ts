import { Router } from 'express';
import UserRoutes from 'routes/user.routes';
import CardsRotes from './cards.routes';

export default class IndexRoutes {
  public router: Router = Router();
  private userRoutes = new UserRoutes();
  private cardsRotes = new CardsRotes();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.use('/', this.userRoutes.router);
    this.router.use('/', this.cardsRotes.router);
  }
}
