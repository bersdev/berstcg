import { Card, PostgresCard } from 'interfaces/card';

export function convertFromPostgresCards(cards: PostgresCard[]): Card[] {
  return cards.map(card => ({
    name: card.name,
    cost: card.cost,
    type: card.type,
    class: card.class,
    isElite: card['is-elite'],
    isLegendary: card['is-legendary'],
    rarity: card.rarity,
    health: card.health,
    move: card.move,
    attack: {
      weak: card['weak-attack'],
      medium: card['medium-attack'],
      strong: card['strong-attack']
    },
    release: card.release,
    nature: card.nature,
    text: card.text,
    artisticText: card['artistic-text'],
    artist: card.artist,
    icons: card.icons
  }));
}

export function covertToPostgresCards(cards: Card[]): PostgresCard[] {
  return cards.map(card => ({
    name: card.name,
    cost: card.cost,
    type: card.type,
    class: card.class,
    'is-elite': card.isElite,
    'is-legendary': card.isLegendary,
    rarity: card.rarity,
    health: card.health,
    move: card.move,
    'weak-attack': card.attack.weak,
    'medium-attack': card.attack.medium,
    'strong-attack': card.attack.strong,
    release: card.release,
    nature: card.nature,
    text: card.text,
    'artistic-text': card.artisticText,
    artist: card.artist,
    icons: card.icons,
  }));
}
