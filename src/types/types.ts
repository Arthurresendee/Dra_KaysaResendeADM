export interface Card {
  _id: string;
  titulo: string;
  texto: string;
}

export interface Topico {
  _id: string;
  tituloTopico: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
