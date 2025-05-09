import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, checkTokenInUrl } = useAuth();

  useEffect(() => {
    // Primeiro verifica se há token na URL
    const hasTokenInUrl = checkTokenInUrl();
    if (!hasTokenInUrl && !isAuthenticated) {
      window.location.href = 'https://drakaysa.com.br';
    }
  }, [isAuthenticated, checkTokenInUrl]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 