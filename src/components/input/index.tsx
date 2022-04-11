import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// criando uma inteface com os tipos de um input, para passar no component "Input";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: Record<string, unknown>;
  icon?: React.ComponentType<IconBaseProps>; // definindo chave que recebe um component como parametro;
}

// passando o tipo InputProps para o component; (funciona como o Proptypes do react com js);
const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  // useRef: utilizado para refenciar algum elemento na tela (Parecido com o getElementById);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false); // estado para alterar a cor do bloco do input;
  const [isFilled, setIsFilled] = useState(false); // estado para trocar ou não a cor do icone caso o input esteja preenchido;

  // fieldName: valor de referencia, valor passado no "name" do input;
  // registerField: faz o registro dos valores no unform;
  // defaultValue: valor setado como padrão, utilizado para form pre-preenchidos;
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // sempre que este component atualizar todos as suas funções são recriadas e isso acaba enchendo muito a memoria, para isso ñ acontecer usamos o useCallback, que sempre relembra as funções;  //SEMPRE DEVEMOS USAR UseCallback PARA CRIAR FUNÇÔES;
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // !! é tipo um if, caso o input tenha valor ele fica true, se não fica false;
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, // pegando a referencia do input;
      path: 'value', // informando onde estara o valor do input dentro da dom;
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {/* Passando os parametros recebido no rest diretamente para a tag input */}
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        autoComplete="off"
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
