import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}
export interface ToastMessage {
  id: string; // colocando esse id pq vamos fazer um map;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      // pegando as informações antigas juntamente das novas e alocando no state messages; (para exibir em tela);
      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    // pegando apenas as msg em que o id for diferente. (para remover a msg);
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };

// <ToastContainer />   :   tag do component toast, ele vai ficar passando de forma global pois esta contida dentro de um useContext;
// (message: Omit<ToastMessage, 'id'>)    :   Definindo a tipagem do message com a interface "ToastMessage" porem sem a chave id, no Omit nos passamos a chave que queremos omitir da interface;
// useToast  :   um hook feito por nos para exporta as funcionalidades de "ToastProvider" com mais facilidade;
