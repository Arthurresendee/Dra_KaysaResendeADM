import { useState } from 'react';
import axios from 'axios';

interface CardInput {
  titulo: string;
  texto: string;
}

export function NovoTopicoForm({ onSuccess }: { onSuccess?: () => void }) {
  const [tituloTopico, setTituloTopico] = useState('');
  const [cards, setCards] = useState<CardInput[]>([
    { titulo: '', texto: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleCardChange(index: number, field: keyof CardInput, value: string) {
    setCards(cards => cards.map((card, i) => i === index ? { ...card, [field]: value } : card));
  }

  function handleAddCard() {
    setCards(cards => [...cards, { titulo: '', texto: '' }]);
  }

  function handleRemoveCard(index: number) {
    setCards(cards => cards.length > 1 ? cards.filter((_, i) => i !== index) : cards);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!tituloTopico.trim()) {
      setError('O título do tópico é obrigatório.');
      return;
    }
    if (cards.some(card => !card.titulo.trim() || !card.texto.trim())) {
      setError('Todos os cards devem ter título e texto.');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post('https://drakaysalandingpageapi-production.up.railway.app/api/topicos', {
        tituloTopico,
        cards
      });
      setSuccess(true);
      setTituloTopico('');
      setCards([{ titulo: '', texto: '' }]);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Erro ao criar tópico.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#14263f]">Criar Novo Tópico</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-center">Tópico criado com sucesso!</div>}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-[#14263f]">Título do Tópico</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={tituloTopico}
          onChange={e => setTituloTopico(e.target.value)}
          placeholder="Digite o título do tópico"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-4 text-[#14263f]">Cards</label>
        <div className="flex flex-col gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 shadow-sm relative">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.titulo}
                    onChange={e => handleCardChange(idx, 'titulo', e.target.value)}
                    placeholder="Título do card"
                    required
                  />
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.texto}
                    onChange={e => handleCardChange(idx, 'texto', e.target.value)}
                    placeholder="Texto do card"
                    required
                    rows={2}
                  />
                </div>
                {cards.length > 1 && (
                  <button
                    type="button"
                    className="ml-2 mt-1 px-2 py-1 text-red-500 hover:text-red-700 text-xs font-bold border border-red-200 rounded transition"
                    onClick={() => handleRemoveCard(idx)}
                    aria-label="Remover card"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
          onClick={handleAddCard}
        >
          + Adicionar Card
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-60"
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Criar Tópico'}
      </button>
    </form>
  );
} 