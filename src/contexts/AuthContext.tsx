import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 1. Captura o token da URL, se existir
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem('auth_token', urlToken);
      // Limpa o token da URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Verifica o token no localStorage do admin
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken || urlToken) {
      setToken(storedToken || urlToken);
      setIsAuthenticated(true);
    } else {
      // Se não houver token, redireciona para o login
      window.location.href = 'https://drakaysa.com.br/login';
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = 'https://drakaysa.com.br/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 