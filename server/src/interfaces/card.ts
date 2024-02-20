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
  class: string;
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
