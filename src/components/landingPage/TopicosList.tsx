import { useEffect, useState } from 'react';
import { useTopicoManager } from '../../Hooks/useTopicoManager';
import axios from 'axios';
import { Topico } from '../../types/types';

interface TopicosListProps {
  onEditTopico?: (topico: Topico) => void;
}

export function TopicosList({ onEditTopico }: TopicosListProps) {
  const { topicos, isLoading, error, fetchTopicos } = useTopicoManager();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopicos();
  }, [fetchTopicos]);

  async function handleRemoveTopico(id: string) {
    setRemovingId(id);
    setRemoveError(null);
    try {
      await axios.delete(`https://drakaysalandingpageapi-production.up.railway.app/api/topicos/${id}`);
      fetchTopicos();
    } catch {
      setRemoveError('Erro ao remover tópico.');
    } finally {
      setRemovingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f5f1eb]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f5f1eb]">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] py-8 px-2">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {removeError && (
          <div className="text-red-600 text-center mb-2">{removeError}</div>
        )}
        {topicos.map((topico) => (
          <div
            key={topico._id}
            className="bg-white border border-gray-200 rounded-md px-4 py-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-[#14263f]">{topico.tituloTopico}</h2>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  onClick={() => onEditTopico && onEditTopico(topico)}
                  aria-label="Editar tópico"
                >
                  Editar
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition disabled:opacity-60"
                  onClick={() => handleRemoveTopico(topico._id)}
                  disabled={removingId === topico._id}
                  aria-label="Remover tópico"
                >
                  {removingId === topico._id ? 'Removendo...' : 'Remover'}
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-2">
              {topico.cards.map((card) => (
                <li
                  key={card._id}
                  className="bg-white border border-gray-200 rounded-md py-2 px-3 flex flex-col text-left"
                >
                  <span className="font-semibold text-gray-800">{card.titulo}:</span>
                  <span className="text-gray-700">{card.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 