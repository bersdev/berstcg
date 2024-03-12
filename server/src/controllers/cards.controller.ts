import PostgresDb from 'db';
import { Request, Response } from 'express';
import { Condition, Column } from 'interfaces/postgres';
import { Card, CardFilterFields, PostgresCard } from 'interfaces/card';
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

  async findCards(req: CustomRequest<CardFilterFields>, res: Response): Promise<Response> {
    const conditions: Condition[] = [];
    
    if (req.body.name) {
      conditions.push({ columnName: 'name', value: req.body.name, type: 'STRING' });
    }
    if (req.body.icons) {
      req.body.icons.forEach(icon => {
        conditions.push({ columnName: 'icons' , value: `{"name":"${icon}"}`, type: 'JSON'});
      });
    }
    if (req.body.type) {
      conditions.push({ columnName: 'type', value: req.body.type, type: 'STRING' });
    }
    if (req.body.class) {
      conditions.push({ columnName: 'class', value: req.body.class, type: 'STRING' });
    }
    if (req.body.isElite) {
      conditions.push({ columnName: 'class', value: req.body.isElite, type: 'BOOLEAN' });
    }
    if (req.body.rarity) {
      req.body.rarity.forEach(rarity => {
        conditions.push({ columnName: 'rarity' , value: rarity, type: 'STRING'});
      });
    }
    if (req.body.cost) {
      conditions.push({ columnName: 'cost', value: req.body.cost.value, operation: req.body.cost.operation, type: 'NUMBER'});
    }
    if (req.body.health) {
      conditions.push({ columnName: 'health', value: req.body.health.value, operation: req.body.health.operation, type: 'NUMBER'});
    }
    if (req.body.move) {
      conditions.push({ columnName: 'move', value: req.body.move.value, operation: req.body.move.operation, type: 'NUMBER'});
    }
    if (req.body.weakAttack) {
      conditions.push({ columnName: 'weak-attack', value: req.body.weakAttack.value, operation: req.body.weakAttack.operation, type: 'NUMBER'});
    }
    if (req.body.releases) {
      req.body.releases.forEach(release => {
        conditions.push({ columnName: 'release' , value: release, type: 'STRING'});
      });
    }
    if (req.body.natures) {
      req.body.natures.forEach(nature => {
        conditions.push({ columnName: 'nature' , value: nature, type: 'STRING'});
      });
    }
    if (req.body.text) {
      conditions.push({ columnName: 'text', value: req.body.text, type: 'STRING' });
    }

    const cardsFromDb: PostgresCard[] = await this.postgresDb.selectFromTable('cards', [], conditions);
    if (!cardsFromDb.length) {
      return res.status(400).send({ message: 'Card not found' });
    }

    const cards = convertFromPostgresCards(cardsFromDb);
    return res.status(200).send(cards);
  }

  async addNewCard(req: CustomRequest<Card>, res: Response): Promise<Response> {
    const card = covertToPostgresCards([req.body])[0];
    await this.postgresDb.insertInTable('cards', card);
    return res.status(200).send('Succefully added');
  }

  async updateCard(req: CustomRequest<Card>, res: Response): Promise<Response> {
    const card = covertToPostgresCards([req.body])[0];

    const conditions: Condition[] = [{ columnName: 'name', value: card.name, type: 'STRING' }];
    const cardsFromDb: PostgresCard[] = await this.postgresDb.selectFromTable('cards', [], conditions);

    await this.postgresDb.updateTable('cards', cardsFromDb[0].id, card);
    return res.status(200).send('Succefully updated');
  }

  async deleteCard(req: CustomRequest<{cardName: string}>, res: Response): Promise<Response> {
    const conditions: Condition[] = [{ columnName: 'name', value: req.body.cardName, type: 'STRING' }];
    const cardsFromDb: PostgresCard[] = await this.postgresDb.selectFromTable('cards', [], conditions);

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
      { name: 'icons', type: 'JSON' },
      { name: 'text', type: 'TEXT', notNull: true },
      { name: 'artistic-text', type: 'TEXT', notNull: true },
      { name: 'artist', type: 'VARCHAR', length: 50 },
    ];

    await this.postgresDb.createTable('cards', columns);
    return res.status(200).send('Succefully create');
  }
}
