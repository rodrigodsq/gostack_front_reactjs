# -----------------------------UNFORM---------------------------

* yarn add @unform/core @unform/web   :   gerenciado de formulario, pois criar um state p cada valor do meu form desgasta muito a aplicação

* Funcionalidade  :
  Page Formulario: {
    * `no component Formulario importamos a dependencia "Form" de @unform/web, e colocamos ela como um  tag no html`;
      <Form initialData={{ nome: 'Rodrigo' }} onSubmit={handleSubmit}>;
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
      </Form>
    * `no initialData passamos os parametros pre-definidos para cada input, no caso o input de name="nome" recebe o valor 'Rodrigo' como default`;
    * `handleSubmit é a função onde vai receber os dados vindo do component "Input", onde temos a função "registerField" que faz o registro dos valores no unfomr para podemos acessalo`;
  }

  Component Input: {
    * `no Component input recebemos o parametros vindo da page "Formulario"`;
      const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest })

    * `useRef: utilizado para refenciar algum elemento na tela (Parecido com o getElementById)`;
      const inputRef = useRef(null);

    * `fieldName: valor de referencia, valor passado no "name" do input`;
    * `registerField: faz o registro dos valores no unform`;
    * `defaultValue: valor setado como padrão, utilizado para form pre-preenchidos`;
      const { fieldName, defaultValue, error, registerField } = useField(name);

    * `ref: inputRef.current    :  pegando a referencia do input`;
    * `path: 'value'  :  informando onde estara o valor do input dentro da dom `;
      useEffect(() => {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'value',
        });
      }, [fieldName, registerField]);

    * `elemento input no HTMl`
      return (
          <input
            defaultValue={defaultValue}
            ref={inputRef}
            {...rest}
            autoComplete="off"
          />
      );

  }

  # -----------------------USECALLBACK-------------------------------

   * sempre que O component atualizar todos as suas funções são recriadas e isso acaba enchendo muito a memoria, para isso ñ acontecer usamos o useCallback, que sempre relembra as funções;  //SEMPRE DEVEMOS USAR UseCallback PARA CRIAR FUNÇÔES;

   # -----------------------YUP------------------------------------

   * yarn add yup   :   dependencia para validação de formularios;
