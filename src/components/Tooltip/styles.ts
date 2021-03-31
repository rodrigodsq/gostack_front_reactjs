import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative; // todo position dentro do Container vai ser relativo ao Container e não a tela;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden; // esconde nosso span;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(
      -50%
    ); //justamente com o left de cima, esta "centralizando" mais o tooltip;
    color: #312e38;

    // bsicamente para fazer um triangulo apontado p baixo so com css;
    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px; // fazendo um triangulo apontado p baixo so com css;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  // para exibir o span apenas quando passar o -moz-user-select;
  &:hover span {
    opacity: 1;
    visibility: visible; // exibe nossp span;
  }
`;
