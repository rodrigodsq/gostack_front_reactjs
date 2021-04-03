import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // tipo para receber o component apenas como um parametro, não como tag;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  // hook de autenticação, onde fica os dados de alguem autenticado;
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

// !!user : os dois !! tranforma em boolean;
// render   :   ele fará o redirecionamento(renderização do component), onde verificamos se é "isPrivate === !!user" pois se os valores booleanos de rota isPrivate for igual ao valor de !!user de usuario autenticados eles continuara para o <Component /> desejado;
// location   :   é o historico de rotas das setas do navegador (setinha de voltar) para que ele ñ seja perdido;
