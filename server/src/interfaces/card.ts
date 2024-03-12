export enum Rarity {
  Common = 'Частая',
  Uncommon = 'Необычная',
  Rare = 'Редкая',
  Legendary = 'Ультраредкая',
}

export enum Release {
  WarOfElements = 'Война стихий',
  InvasionOfDarkness = 'Нашествие тьмы',
  LegendsOfLaar = 'Легенды Лаара',
  SeedsOfDiscord = 'Семена раздора',
}

export enum Nature {
  Plain = 'Степи',
  Mountain = 'Горы',
  Forest = 'Леса',
  Swamp = 'Болота',
  Dakrkness = 'Тьма',
  Neutral = 'Нейтральная'
}

export interface Card {
  name: string;
  cost: number;
  type: string;
  class: string | null;
  isElite: boolean;
  isLegendary: boolean;
  rarity: Rarity;
  health: number;
  move: number;
  attack: {
    weak: number;
    medium: number;
    strong: number;
  };
  release: Release;
  nature: Nature;
  icons: {name: string, value?: number}[];
  text: string;
  artisticText: string;
  artist: string;
}

export interface PostgresCard {
  id?: number;
  name: string;
  cost: number;
  type: string;
  class: string | null;
  'is-elite': boolean;
  'is-legendary': boolean;
  rarity: Rarity;
  health: number;
  move: number;
  'weak-attack': number;
  'medium-attack': number;
  'strong-attack': number;
  release: Release;
  nature: Nature;
  icons: {name: string, value?: number}[];
  text: string;
  'artistic-text': string;
  artist: string;
}

export enum Compare {
  '=' = '=',
  '>' = '>',
  '>=' = '>=',
  '<=' = '<=',
  '<' = '<',
  '<>' = '<>'
} 

export interface CardFilterFields {
  name?: string;
  icons?: string[];
  type?: string;
  class?: string;
  isElite?: boolean;
  rarity?: Rarity[];
  cost?: {
    value: number;
    operation: Compare;
  };
  health?: {
    value: number;
    operation: Compare;
  };
  move?: {
    value: number;
    operation: Compare;
  };
  weakAttack?: {
    value: number;
    operation: Compare;
  };
  releases?: Release[];
  natures?: Nature[];
  text?: string;
}
