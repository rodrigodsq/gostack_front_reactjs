import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

// msg de error flutuante do formulario;
// a className serve para que a estilização feita no styles do input funcione;
const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
