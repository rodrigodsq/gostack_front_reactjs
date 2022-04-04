import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// criando uma tipagem com os tipos de um button, para passar no component "Button";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// passando "ButtonProps" como tipo do component "Button";
// children é o texto do button;
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
