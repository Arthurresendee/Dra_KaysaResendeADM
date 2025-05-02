import { useState } from 'react';
import { TopicoType } from '../types/types';

export function useTopicoManager() {
  const [topicos, setTopicos] = useState<TopicoType[]>([]);

  const adicionarTopico = (novoTopico: TopicoType) => {
    setTopicos([...topicos, novoTopico]);
  };

  const excluirTopico = (id: string) => {
    setTopicos(topicos.filter(topico => topico.id !== id));
  };

  const adicionarCard = (topicoId: string, novoCard: { titulo: string; texto: string }) => {
    setTopicos(topicos.map(topico => {
      if (topico.id === topicoId) {
        return {
          ...topico,
          cards: [...topico.cards, { ...novoCard, id: Date.now().toString() }]
        };
      }
      return topico;
    }));
  };

  const excluirCard = (topicoId: string, cardId: string) => {
    setTopicos(topicos.map(topico => {
      if (topico.id === topicoId) {
        return {
          ...topico,
          cards: topico.cards.filter(card => card.id !== cardId)
        };
      }
      return topico;
    }));
  };

  return {
    topicos,
    adicionarTopico,
    excluirTopico,
    adicionarCard,
    excluirCard
  };
} 