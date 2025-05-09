import { useState, useCallback } from 'react';
import axios from 'axios';
import { Topico } from '../types/types';

const API_URL = 'https://drakaysalandingpageapi-production.up.railway.app/api';

export function useTopicoManager() {
  const [topicos, setTopicos] = useState<Topico[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopicos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Topico[]>(`${API_URL}/topicos`);
      setTopicos(response.data);
    } catch (err) {
      setError('Erro ao carregar os tópicos');
      console.error('Erro ao buscar tópicos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    topicos,
    isLoading,
    error,
    fetchTopicos
  };
} 