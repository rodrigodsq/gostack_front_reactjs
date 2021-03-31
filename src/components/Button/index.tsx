import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// criando uma tipagem com os tipos de um button, para passar no component "Button";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// passando "ButtonProps" como tipo do component "Button";
// children é o texto do button;
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
