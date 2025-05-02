export interface Card {
  id: string;
  titulo: string;
  texto: string;
}

export interface TopicoType {
  id: string;
  tituloTopico: string;
  cards: Card[];
}
