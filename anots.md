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


# ---------------------- API DE CONTEXTO --------------------------

* é uma variavel que fica acessivel de forma global ou não global na aplicação; (Bastante utilizado para armazenar dados de autenticação);

* funcionalidade: em um arquivo especifico é criado/instanciado uma const do createContext, que sera responsavel por toda iteração em nossos arquivos.
  - Essa var é passada em volta das outras tags no arquivo principal app.tsx, para que fique acessivel em toda aplicação,
  - e tudo que sera retornado para o restante da aplicação vem dessa instacia, por isso criamos um component no arquivo onde essa instancia está, nesse component poderá ter estados e funções que serão exportados em toda aplicação.

EX: context/AuthContext;
  - AuthContext  :   arquivo principal de instancia do createContext, é utilizado como tag (leia abaixo);
  - <AuthContext.Provider> :  dentro da tag <AuthContext.Provider> são passadas os valores que serão exportados de forma global no useContext ;
  - sigIn  : função que é passada na tag <AuthContext.Provider>, para autenticação(login);
  - sigIn  : função para deslogar o usuario autenticado, que limpa os dados de auteticação no localstorage e no state data;
  - [data, setData]  :   estado que armazenar os dados do usuario autenticado, ao iniciar ele ja verifica se existe algum usuario autenticado no localstorage;
  - AuthProvider : component do createContext que vai ser exportado p app.tsx, nele tbm fica todos os dados(variaveis e funções) que serão exportados p outros arquivos;
  - useAuth()  :   criando hook de autenticação;


# ------------------ BLIBIOTECA DE ANIMAÇÕES ---------------------

* $ yarn add react-spring@8.0.27   :   biblioteca de animações(So funcionou bem essa versão);

* não funciona em elementos html, temos que usar em elementos do proprio react-spring

# --------------------------------------------------

* children  :   Tudo que o elemento receber como filho sera um children;

* components declarados no app.tsx (em forma de tag) ficam disponiveis globalmente;

* uma função é automaticamente retornada de um useEffect se o component (toast) deixar de existir (caso o usuario feche o toast antes dos 3segundos ai ja executa a função) para que ele ñ tente fechar algo que ja foi fechado;
