import { Client } from 'pg';
import { Condition, Column } from 'interfaces/postgres';
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} from 'config';

export default class PostgresDb {
  private client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  constructor() {
    this.connectToDb();
  }

  async selectFromTable(tableName: string, columns: string[], condition?: Condition): Promise<any> {
    const select = columns.length ? columns.join(',') : '*';
    const queryCondition = condition ? `WHERE ${condition.columnName}='${condition.value}'` : '';
    const res = await this.client.query(`SELECT ${select} FROM ${tableName} ${queryCondition};`);
    return res.rows;
  }

  async createTable(tableName: string, columns: Column[]): Promise<any> {
    const queryColumns = `create table ${tableName} (\n` + columns.map((column, index) => {
      const type = `${column.type === 'VARCHAR' ? `(${column.length})` : ''}`;
      const primary = `${column.primary ? 'PRIMARY KEY' : ''}`;
      const unique = `${column.unique ? 'UNIQUE': ''}`;
      const notNull = `${column.notNull ? 'NOT NULL' : ''}`;
      return `"${column.name}" ${column.type}${type} ${primary} ${unique} ${notNull}${columns.length - 1 === index ? '' : ',' }`;
    }).join('\n') + '\n);';
    return await this.client.query(queryColumns);
  }

  async insertInTable(tableName: string, object: {[key: string]: any}): Promise<any> {
    const columns = Object.keys(object).map(key => `"${key}"`).join(', '); // Тут только двойные кавычки работают
    const values = Object.keys(object).map(key => {
      if (typeof object[key] === 'string') {
        return `'${object[key]}'`;
      }
      if (object[key] === null) {
        return `${object[key]}`;
      }
      return object[key];
    }).join(', '); // Тут только одинарные
    const stringQuery = `INSERT INTO ${tableName} (${columns})\nVALUES (${values});`;
    return await this.client.query(stringQuery);
  }

  async updateTable(tableName: string, id: number | undefined, object: {[key: string]: any}): Promise<any> {
    const values = Object.keys(object).map(key => {
      if (typeof object[key] === 'string') {
        return `"${key}"='${object[key]}'`;
      }
      return `"${key}"=${object[key]}`;
    }).join(', ');
    const stringQuery = `UPDATE ${tableName} SET ${values} WHERE id=${id}`;
    return await this.client.query(stringQuery);
  }

  async deleteFromTable(tableName: string, id: number | undefined): Promise<any> {
    const stringQuery = `DELETE FROM ${tableName} WHERE id=${id}`;
    return await this.client.query(stringQuery);
  }

  private async connectToDb(): Promise<void> {
    await this.client.connect();
  }

  private async disconnect(): Promise<void> {
    await this.client.end();
  }
}
