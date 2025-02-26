# Rick and Morty API

O projeto **Rick and Morty API** integra uma interface frontend moderna com um backend robusto, permitindo a exploração dos personagens da série e oferecendo funcionalidades completas de autenticação e gerenciamento de usuários.

## Visão Geral

- **Frontend:**  
  Desenvolvido com React, TypeScript e Tailwind CSS, o frontend é uma SPA que exibe informações dos personagens (nome, localização, espécie, gênero, etc.) e permite que o usuário se cadastre, faça login e atualize seus dados.

- **Backend:**  
  Construído com Express e TypeScript, o backend utiliza o Prisma como ORM para interagir com um banco de dados PostgreSQL. A aplicação implementa autenticação via JWT, validação de dados e operações de CRUD para usuários.

## Funcionalidades Principais

- **Autenticação e Autorização:**  
  Implementação de autenticação com JWT e middlewares para proteção de rotas sensíveis.

- **Gerenciamento de Usuários:**  
  Endpoints para criação de conta, login, obtenção de dados do usuário e atualização de informações (dados pessoais e senha).

- **Integração com API Externa:**  
  O frontend consome dados da [Rick and Morty API](https://rickandmortyapi.com/) para exibir informações atualizadas dos personagens.

## Estrutura do Projeto

A organização do repositório é a seguinte:

```
rick-and-morty-api/
├── frontend/   # Interface do usuário (SPA)
└── backend/    # Servidor API (Express, Prisma)
```

Cada pasta possui seu próprio README detalhado com instruções específicas de instalação, configuração e execução.

## Acessando os READMEs Internos

Para visualizar os detalhes técnicos e as instruções de uso para cada parte do projeto, você pode acessar os READMEs diretamente pelo terminal ou pelo seu editor de código.

### Pelo Terminal

1. **Frontend:**  
   Navegue até a pasta `frontend` e leia o README:

   ```bash
   cd frontend
   cat README.md
   ```

2. **Backend:**  
   Navegue até a pasta `backend` e leia o README:

   ```bash
   cd backend
   cat README.md
   ```

### Pelo Editor de Código

Abra o repositório no seu editor favorito e navegue pelas pastas `frontend` e `backend` para visualizar os respectivos arquivos `README.md`.

## Notas
Para mais detalhes sobre o projeto, consulte os arquivos README nas pastas **frontend** e **backend**.