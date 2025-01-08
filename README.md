# Teste Leek Soluções: Vaga Desenvolvedor Fullstack Pleno

Este projeto é uma aplicação full-stack desenvolvida com **NestJS** no backend e **Next.js** no frontend. A aplicação permite o gerenciamento de tarefas, com funcionalidades como adicionar, editar, e listar tarefas.

## Tecnologias Utilizadas

- **Backend**: NestJS, Prisma, PostgreSQL, JWT, bcryptjs
- **Frontend**: Next.js, React, TailwindCSS, React Toastify

## Requisitos

Antes de rodar o projeto, verifique se as seguintes ferramentas estão instaladas:

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Clonar repositório

```bash
git clone https://github.com/devguilara/fullstack-teste-tecnico
```

## Configuração do Backend (NestJS)

### 1. Acessar pasta do backend

```bash
cd backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o Banco de Dados

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco

```

### 4. Rodar as Migrations

```bash
npx prisma migrate dev
```

### 5. Rodar o Servidor

```bash
npm run start
```

## Configuração do Frontend (Next.js)

### 1. Acessar pasta do client

```bash
cd client
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o frontend

```bash
npm run dev
```

### Estrutura do Projeto

- backend/: Contém o código fonte do backend, incluindo o servidor NestJS, autenticação, lógica de tarefas, etc.

- client/: Contém o código fonte do frontend, incluindo as páginas Next.js, componentes React, e estilização com TailwindCSS.
