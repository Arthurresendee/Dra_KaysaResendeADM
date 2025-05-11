import { useState } from 'react';
import { TopicosList } from '../components/landingPage/TopicosList';
import { NovoTopicoForm } from '../components/landingPage/NovoTopicoForm';
import { useTopicoManager } from '../Hooks/useTopicoManager';
import { Topico } from '../types/types';

export function LandingPageAdm() {
  const { fetchTopicos } = useTopicoManager();
  const [editTopico, setEditTopico] = useState<Topico | null>(null);

  function handleEditTopico(topico: Topico) {
    setEditTopico(topico);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleFinishEdit() {
    setEditTopico(null);
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] pt-20">
      <div className="mt-8">
        <NovoTopicoForm
          onSuccess={() => {
            fetchTopicos();
            handleFinishEdit();
          }}
          editTopico={editTopico}
          onCancelEdit={handleFinishEdit}
        />
      </div>
      <TopicosList onEditTopico={handleEditTopico} />
    </div>
  );
}
