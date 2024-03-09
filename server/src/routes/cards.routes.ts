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
    this.router.get('/createCardsTable', this.controller.createCardsTable.bind(this.controller));
    this.router.post('/addNewCard', this.controller.addNewCard.bind(this.controller));
    this.router.post('/updateCard', this.controller.updateCard.bind(this.controller));
    this.router.post('/deleteCard', this.controller.deleteCard.bind(this.controller));
    this.router.post('/findCards', this.controller.findCards.bind(this.controller));
  }
}