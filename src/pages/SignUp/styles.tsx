import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh; // 100vh    :   para ocupar o total da altura da viewport( da tela do navegador do usuario);
  display: flex;
  align-items: stretch; // faz com que as tags filho tenha 100vh, ou seja ocupe a tela inteira;

  img {
    width: 200px;
    height: 200px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; // faz o mesmo que align-item e justify-content, coloca ao meio;
  width: 100%;
  max-width: 550px;

  form {
    margin: 15px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  // sinal > significa que so ira afetar as tag "a" no msm nivel, não as tags filhas;
  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover; // para a imagem sempre cobrir toda sua area. não deixar espaços em volta;
`;
