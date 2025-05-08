import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
  getTokenExpiration: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para validar se é um JWT válido
function isValidJWT(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    const expirationTime = payload.exp * 1000; // Converter para milissegundos
    
    // Verifica se o token expirou
    if (Date.now() >= expirationTime) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// Função para obter a data de expiração do token
function getTokenExpiration(token: string): string | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    const expirationTime = payload.exp * 1000; // Converter para milissegundos
    
    return new Date(expirationTime).toLocaleString();
  } catch {
    return null;
  }
}

// Configurar o axios para incluir o token em todas as requisições
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('auth_token');
      window.location.href = 'https://drakaysa.com.br';
    }
    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Captura o token da URL, se existir
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');

    if (urlToken) {
      // Valida o token antes de salvar
      if (isValidJWT(urlToken)) {
        localStorage.setItem('auth_token', urlToken);
        setToken(urlToken);
        setIsAuthenticated(true);
        // Limpa o token da URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        // Token inválido
        localStorage.removeItem('auth_token');
        window.location.href = 'https://drakaysa.com.br';
        return;
      }
    }

    // Verifica se existe token no localStorage
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      // Valida o token armazenado
      if (isValidJWT(storedToken)) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        // Token expirado ou inválido
        localStorage.removeItem('auth_token');
        window.location.href = 'https://drakaysa.com.br';
      }
    } else {
      // Sem token
      window.location.href = 'https://drakaysa.com.br';
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = 'https://drakaysa.com.br';
  };

  const getTokenExpiration = () => {
    if (!token) return null;
    return getTokenExpiration(token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logout, getTokenExpiration }}>
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