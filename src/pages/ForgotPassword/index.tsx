import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {

  const [loading, setLoading] = useState(false);

  // useRef: utilizado para refenciar algum elemento na tela (Parecido com o getElementById);
  // FormHandles: são as tipagem da referencia "Form" do @unform;
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  // essa função esta sendo emitida por um component unform, consegue pegar os valores por referencia vindo do component Input;
  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        // limpando os erros;
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Digite um e-mail valido'),
        });

        // executa as verificações a cima, com as informações do nosso form (data);
        await schema.validate(data, {
          abortEarly: false, // para retorna todos os erros que ocorreu;
        });

        await api.post('/password/forgot', {
          email: data.email
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
        });

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
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit"> Recuperar </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
