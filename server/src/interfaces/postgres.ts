import { Compare } from './card';

export interface Condition {
  columnName: string;
  value: string | number | boolean;
  type: 'STRING' | 'JSON' | 'NUMBER' | 'BOOLEAN';
  operation?: Compare;
}

export interface Column {
  name: string;
  type: 'SERIAL' | 'VARCHAR' | 'SMALLSERIAL' | 'BOOLEAN' | 'TIMESTAMP' | 'TEXT' | 'JSON';
  length?: number;
  primary?: boolean;
  unique?: boolean;
  notNull?: boolean;
}
