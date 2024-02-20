import { Request, Response } from 'express';
import { cards } from 'db';
import { Card } from 'interfaces/card';

export default class CardsController {
  getAllCards(_: Request, res: Response): Response {
    if (!cards) {
      return res.status(400).send({ message: 'Database of card are empty' });
    }
    return res.status(200).send(cards);
  }

  getCard(req: Request, res: Response): Response {
    if (!req.params.cardName) {
      return res.status(400).send({ message: 'Required card name' });
    }
  
    const card = cards.find((card: Card) => card.name === req.params.cardName);
    if (!card) {
      return res.status(400).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  }
}
