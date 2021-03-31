import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationsErrors';

const SignUp: React.FC = () => {
  // useRef: utilizado para refenciar algum elemento na tela (Parecido com o getElementById);
  // FormHandles: são as tipagem da referencia "Form" do @unform;
  const formRef = useRef<FormHandles>(null);

  // essa função esta sendo emitida por um component unform, consegue pegar os valores por referencia vindo do component Input;
  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    try {
      // limpando os erros;
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().min(6, 'No minimo 6 digitos'),
      });

      // executa as verificações a cima, com o nosso data com as informações do nosso form;
      await schema.validate(data, {
        abortEarly: false, // para retorna todos os erros que ocorreu;
      });
    } catch (err) {
      console.log(err);

      // getValidationErrors: função onde filtra todos os errors;
      const errors = getValidationErrors(err);

      // coloca os errors em tela ???
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit"> Cadastrar </Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
