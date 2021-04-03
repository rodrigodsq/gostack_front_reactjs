import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: unknown; // era p ser object :/
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: unknown;
  signIn(credentials: SignInCredentials): Promise<void>; // definindo uma função passando a tipagem de SignInCredentials e com uma promise de retorno;
  signOut(): void;
}

// api de contexto, do tipo AuthContextData, e definindo os parametros tbm como AuthContextData;
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState | null>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) }; // retornando para o estado(data)
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data?.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // verificando se já existe contexto (se ja passamos o AuthContext no app.tsx); se esta em um contexto do AuthProvider;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// AuthContext  :   arquivo principal de instancia do createContext, é utilizado como tag (leia abaixo);
// <AuthContext.Provider> :  dentro da tag <AuthContext.Provider> são passadas os valores que serão exportados de forma global no useContext ;
// sigIn  : função que é passada na tag <AuthContext.Provider>, para autenticação(login);
// sigIn  : função para deslogar o usuario autenticado, que limpa os dados de auteticação no localstorage e no state data;
// [data, setData]  :   estado que armazenar os dados do usuario autenticado, ao iniciar ele ja verifica se existe algum usuario autenticado no localstorage;
// AuthProvider : component do createContext que vai ser exportado p app.tsx, nele tbm fica todos os dados(variaveis e funções) que serão exportados p outros arquivos;
// useAuth()  :   criando hook de autenticação;
