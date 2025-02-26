# Rick and Morty API - Backend

Este é o servidor backend da aplicação Rick and Morty API, desenvolvido em TypeScript com Express e Prisma. Ele gerencia a autenticação, criação e atualização de usuários, além de fornecer as rotas para integração com o frontend.

## Tecnologias Utilizadas

- **Express** – Framework para criação do servidor web.
- **TypeScript** – Linguagem com tipagem estática para maior robustez e manutenibilidade.
- **Prisma** – ORM para interação com o banco de dados PostgreSQL.
- **PostgreSQL** – Banco de dados relacional utilizado pela aplicação.
- **JWT (jsonwebtoken)** – Para autenticação e geração de tokens.
- **bcrypt / bcryptjs** – Para criptografia e verificação de senhas.
- **dotenv** – Gerenciamento de variáveis de ambiente.
- **cors** – Controle de acesso via CORS.

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

2. **Acesse a pasta do backend**

   ```bash
    cd backend
   ```

3. **Instale as dependências**

   ```bash
    npm install
   ```

## Configuração

- **Variáveis de Ambiente:**  
  Copie o arquivo `.env.exp` para `.env` e configure as variáveis conforme sua necessidade. As variáveis necessarias são:
  - `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL.
  - `SECRET_KEY`: Chave secreta para assinatura dos tokens JWT.

- **Origem das Requisições (CORS):**  
  No arquivo `src/index.ts`, há uma lista de origens permitidas (`allowedOrigins`). Caso a origem do frontend mude ou a aplicação seja executada localmente, **lembre-se de atualizar essa lista** para permitir o acesso além de mudar o valor da variavel porta caso seja executado localmente.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
rick-and-morty-api/
└── frontend/
    └── backend/
        ├── dist/                   # Build da aplicação para produção
        ├── node_modules/           # Dependências instaladas
        ├── prisma/                 # Arquivos de configuração e migrations do Prisma
        ├── src/
        │   ├── authMiddleWares/    # Middlewares de autenticação
        │   │   └── authMiddleWares.ts
        │   ├── models/             # Modelos (ex.: http-result.ts)
        │   ├── utils/              # Funções utilitárias (ex.: utils.ts)
        │   ├── controller.ts       # Lógica de controle das operações (login, cadastro, etc.)
        │   ├── index.ts            # Ponto de entrada da aplicação (configuração do servidor)
        │   ├── request.ts          # Tipos e interfaces para requisições
        │   └── routes.ts           # Definição das rotas da API
        ├── .env.exp                # Exemplo de configuração de variáveis de ambiente
        ├── .gitignore              # Arquivo para ignorar arquivos no controle de versão
        ├── package-lock.json       # Lockfile do npm
        ├── package.json            # Configurações do projeto e scripts
        └── tsconfig.json           # Configuração do TypeScript
```

## Scripts Disponíveis

- **Desenvolvimento:**  
  Inicie o servidor em modo de desenvolvimento com hot-reloading:

  ```bash
  npm run dev
  ```

- **Build para Produção:**  
  Compile o projeto TypeScript para JavaScript:

  ```bash
  npm run build
  ```

- **Iniciar em Produção:**  
  Após o build, inicie o servidor a partir dos arquivos compilados:

  ```bash
    npm start
  ```

## Importante

- **.env:**  
  Configure corretamente o arquivo `.env` com as variáveis `DATABASE_URL` e `SECRET_KEY`.

- **Allowed Origins:**  
  No arquivo `src/index.ts`, verifique e, se necessário, altere o array `allowedOrigins` para refletir a origem do seu frontend, principalmente se estiver rodando o backend localmente.

- **Prisma:**  
  Caso necessario utilize os comandos do prisma para gerar os modelos do banco de dados no prisma:

  ```bash
  cd prisma
  npx prisma db pull
  npx prisma generate
  ```
