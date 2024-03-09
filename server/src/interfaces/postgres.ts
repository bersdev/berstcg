export interface Condition {
  columnName: string;
  value: string | number;
  type: 'STRING' | 'JSON';
}

export interface Column {
  name: string;
  type: 'SERIAL' | 'VARCHAR' | 'SMALLSERIAL' | 'BOOLEAN' | 'TIMESTAMP' | 'TEXT' | 'JSON';
  length?: number;
  primary?: boolean;
  unique?: boolean;
  notNull?: boolean;
}
