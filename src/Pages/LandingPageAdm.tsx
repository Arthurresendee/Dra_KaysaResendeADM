import { TopicosList } from '../components/landingPage/TopicosList';
import { NovoTopicoForm } from '../components/landingPage/NovoTopicoForm';
import { useTopicoManager } from '../Hooks/useTopicoManager';

export function LandingPageAdm() {
  const { fetchTopicos } = useTopicoManager();

  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      <div className="mt-8">
        <NovoTopicoForm onSuccess={fetchTopicos} />
      </div>
      <TopicosList />
    </div>
  );
}
