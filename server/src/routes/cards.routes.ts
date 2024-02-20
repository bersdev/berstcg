import { Router } from 'express';
import CardsController from 'controllers/cards.controller';

export default class CardsRotes {
  public router: Router = Router();
  private controller = new CardsController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.get('/getAllCards', this.controller.getAllCards.bind(this.controller));
    this.router.get('/card/:cardName', this.controller.getCard.bind(this.controller));
  }
}