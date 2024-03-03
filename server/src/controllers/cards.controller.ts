import PostgresDb from 'db';
import { Request, Response } from 'express';
import { Condition, Column } from 'interfaces/postgres';
import { Card, PostgresCard } from 'interfaces/card';
import { convertFromPostgresCards, covertToPostgresCards } from 'utils/card.util';
import { CustomRequest } from 'interfaces/query';

export default class CardsController {
  private postgresDb: PostgresDb = new PostgresDb();

  async getAllCards(_: Request, res: Response): Promise<Response> {
    const cardsFromDb = await this.postgresDb.selectFromTable('cards', []);
    if (!cardsFromDb) {
      return res.status(400).send({ message: 'Database of card are empty' });
    }

    const cards = convertFromPostgresCards(cardsFromDb);
    return res.status(200).send(cards);
  }

  async getCard(req: Request, res: Response): Promise<Response> {
    if (!req.params.cardName) {
      return res.status(400).send({ message: 'Required card name' });
    }

    const condition: Condition = { columnName: 'name', value: req.params.cardName };
    const cardsFromDb: PostgresCard[] = await this.postgresDb.selectFromTable('cards', [], condition);
    if (!cardsFromDb.length) {
      return res.status(400).send({ message: 'Card not found' });
    }

    const cards = convertFromPostgresCards(cardsFromDb);
    return res.status(200).send(cards[0]);
  }

  async addNewCard(req: CustomRequest<Card>, res: Response): Promise<Response> {
    const card = covertToPostgresCards([req.body])[0];
    await this.postgresDb.insertInTable('cards', card);
    return res.status(200).send('Succefully added');
  }

  async updateCard(req: CustomRequest<Card>, res: Response): Promise<Response> {
    const card = covertToPostgresCards([req.body])[0];

    const condition: Condition = { columnName: 'name', value: card.name };
    const cardsFromDb: PostgresCard[] = await this.postgresDb.selectFromTable('cards', [], condition);

    await this.postgresDb.updateTable('cards', cardsFromDb[0].id, card);
    return res.status(200).send('Succefully updated');
  }

  async deleteCard(req: CustomRequest<Card>, res: Response): Promise<Response> {
    const card = covertToPostgresCards([req.body])[0];

    const condition: Condition = { columnName: 'name', value: card.name };
    const cardsFromDb: PostgresCard[] = await this.postgresDb.selectFromTable('cards', [], condition);

    await this.postgresDb.deleteFromTable('cards', cardsFromDb[0].id);
    return res.status(200).send('Succefully deleted');
  }

  async createCardsTable(req: Request, res: Response): Promise<Response> {
    const columns: Column[] = [
      { name: 'id', type: 'SERIAL', primary: true },
      { name: 'name', type: 'VARCHAR', length: 50, unique: true, notNull: true },
      { name: 'cost', type: 'SMALLSERIAL'},
      { name: 'type', type: 'VARCHAR', length: 50, notNull: true },
      { name: 'class', type: 'VARCHAR', length: 50 },
      { name: 'is-elite', type: 'BOOLEAN', notNull: true },
      { name: 'is-legendary', type: 'BOOLEAN', notNull: true },
      { name: 'rarity', type: 'VARCHAR', length: 50, notNull: true },
      { name: 'health', type: 'SMALLSERIAL', notNull: true },
      { name: 'move', type: 'SMALLSERIAL', notNull: true },
      { name: 'weak-attack', type: 'SMALLSERIAL', notNull: true },
      { name: 'medium-attack', type: 'SMALLSERIAL', notNull: true },
      { name: 'strong-attack', type: 'SMALLSERIAL', notNull: true },
      { name: 'release', type: 'VARCHAR', length: 50, notNull: true },
      { name: 'nature', type: 'VARCHAR', length: 50, notNull: true },
      { name: 'icons', type: 'HSTORE' },
      { name: 'text', type: 'TEXT', notNull: true },
      { name: 'artistic-text', type: 'TEXT', notNull: true },
      { name: 'artist', type: 'VARCHAR', length: 50 },
    ];

    await this.postgresDb.createTable('cards', columns);
    return res.status(200).send('Succefully create');
  }
}
