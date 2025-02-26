# Rick and Morty API - Frontend

Este projeto é a interface frontend para a aplicação Rick and Morty API. Atualmente, ele foca somente na camada de apresentação, permitindo que o usuário explore informações dos personagens da série como nome, localização, espécie e genêro. Permite também que o usuario faça seu cadastro, login e mude suas informações como nome, e-mail e senha.

## Tecnologias Utilizadas

- **React** – Biblioteca para criação de interfaces dinâmicas e componentizadas.
- **TypeScript** – Adiciona tipagem estática ao JavaScript para maior robustez no desenvolvimento.
- **Tailwind CSS** – Framework utilitário para criação de layouts responsivos e estilizados.
- **React Router DOM** – Gerenciamento de rotas na aplicação.
- **Outros Componentes Customizados** – Componentes de UI como Input, Spinner, etc para padronização do design.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

Para verificar se o Node.js e o npm estão instalados, utilize os comandos:

```bash
node -v
npm -v
```

## Instalação

1. **Clone o repositório**

   ```bash
    git clone https://github.com/seu-usuario/rick-and-morty-api.git
   ```

2. **Acesse a pasta do frontend**

   ```bash
    cd frontend
   ```

3. **Instale as dependências**

   Utilizando npm:

   ```bash
    npm install
   ```

   Ou, se preferir o Yarn:

   ```bash
    yarn install
   ```

## Uso

Para iniciar o servidor de desenvolvimento e visualizar a aplicação em seu navegador, execute:

```bash
  npm run dev
```

Ou, se estiver usando Yarn:

```bash
  yarn dev
```

A aplicação ficará disponível normalmente em [http://localhost:3000](http://localhost:3000) porém a porta pode variar.

## Estrutura do Projeto

A seguir, uma visão geral da estrutura do projeto:

```
rick-and-morty-api/
└── frontend/
    ├── .vite/                  # Diretório de cache do Vite
    ├── dist/                   # Diretório de build para produção
    ├── node_modules/           # Dependências instaladas
    ├── public/                 # Arquivos estáticos e index.html
    ├── src/
    │   ├── assets/             # Imagens e outros recursos
    │   ├── components/         # Componentes reutilizáveis (layouts, botões, inputs, etc.)
    │   │   ├── PageLayout/
    │   │   ├── RotaProtegida/
    │   │   ├── ui/
    │   │   ├── VerificarToken/
    │   │   ├── Creditos.tsx
    │   │   └── Voltar.tsx
    │   ├── hooks/              # Hooks customizados
    │   │   └── use-toast.ts
    │   ├── lib/                # Funções utilitárias
    │   │   └── utils.ts
    │   ├── pages/              # Páginas (cadastrar, central, entrar, início, página não encontrada, etc.)
    │   │   ├── cadastrar.tsx
    │   │   ├── central.tsx
    │   │   ├── entrar.tsx
    │   │   ├── inicio.tsx
    │   │   └── paginaNaoEncontrada.tsx
    │   ├── service/            # Serviços de integração com a API
    │   ├── types/              # Definições de tipos TypeScript
    │   ├── app.css
    │   ├── app.tsx             # Componente raiz da aplicação
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .gitignore
    ├── componentes.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json            # Configurações do projeto e dependências
    ├── postcss.config.js
    ├── tailwind.config.js      # Configuração do Tailwind CSS
    ├── ts.config.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Comandos Úteis

- **Instalar dependências:**  
  `npm install` ou `yarn install`

- **Iniciar o servidor de desenvolvimento:**  
  `npm run dev` ou `yarn dev`

- **Build para produção:**  
  `npm run build` ou `yarn build`

## Observações

- **API Externa:**  
  Este frontend consome dados da [Rick and Morty API](https://rickandmortyapi.com/). Certifique-se de que seu dispositivo possua conexão com a internet para que os dados sejam carregados corretamente.

- **Atenção à URL do Backend:**  
  Caso o backend seja executado localmente ou em algum outro local, **lembre-se de alterar a URL base configurada no arquivo de serviços (service)** para apontar para o seu servidor local. Por exemplo, se o backend estiver rodando em `http://localhost:3001`, ajuste a URL no service para refletir essa alteração.

- **Customizações:**  
  Caso necessite de ajustes na estilização, verifique o arquivo `tailwind.config.js` e os componentes presentes na pasta `src/components/`.

