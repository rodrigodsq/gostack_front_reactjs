import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  // useRef: utilizado para refenciar algum elemento na tela (Parecido com o getElementById);
  // FormHandles: são as tipagem da referencia "Form" do @unform;
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  // essa função esta sendo emitida por um component unform, consegue pegar os valores por referencia vindo do component Input;
  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        // limpando os erros;
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatoria'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta',
          ),
        });

        // executa as verificações a cima, com as informações do nosso form (data);
        await schema.validate(data, {
          abortEarly: false, // para retorna todos os erros que ocorreu;
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        // verificando se o error é uma instancia de Yup. (se o erro veio do yup)
        if (err instanceof Yup.ValidationError) {
          // getValidationErrors: função onde filtra todos os errors;
          const errors = getValidationErrors(err);

          // coloca os errors em tela ???
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit"> Alterar senha </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
