# Chat App

Um aplicativo de chat moderno e intuitivo, desenvolvido com **React** e **Socket.io**. Este projeto permite criar contas, conversar em tempo real, gerenciar grupos e exibir o status dos membros (online/offline).

---

## Telas Disponíveis

### 1. Login
Tela para autenticação de usuários existentes. 

### 2. Cadastro de Usuário
Tela para registro de novos usuários no sistema.

### 3. Home
Interface principal que exibe:
- Grupos
- Conversas
- Lista de membros

### 4. Novo Grupo
Permite criar novos grupos para comunicação em tempo real com vários membros.

---

## Estrutura do Projeto

A estrutura de pastas segue o padrão de separação por responsabilidade:

```plaintext
src
|-- components
|   |-- user-message.js
|
|-- pages
|   |-- Home
|   |   |-- index.js
|   |   |-- style.css
|   |-- Login
|   |   |-- index.js
|   |   |-- style.css
|   |-- Register
|   |   |-- index.js
|   |   |-- style.css
|
|-- services
|   |-- api.js
|
|-- App.js
|-- index.css
|-- index.js
|-- routes.js
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
|-- Senhas do Chat.txt
```

## Funcionalidades Implementadas

- **Autenticação**

Login de usuários com token JWT (prefixo Bearer no cabeçalho de autorização).

- **Chat em tempo real**

Envio e recebimento de mensagens em tempo real com Socket.io.

- **Grupos**

Criação e gerenciamento de grupos.
Envio de mensagens para múltiplos membros em grupos.

- **Notificações**

Notificações de novas mensagens para usuários em outras salas ou com o app minimizado.

- **Status dos Usuários**

Indica se os usuários estão online ou offline.

## Tecnologias Utilizadas

- Javascript
- Socket.io
- React

## Resultados:

### Tela de Login
<img src="./public/assets/Tela de Login.png" alt="Texto Alternativo">

### Tela de Cadastro
<img src="./public/assets/Tela de Cadastro.png" alt="Texto Alternativo">

### Tela de Home
<img src="./public/assets/Tela de Home.png" alt="Texto Alternativo">

### Tela de Membros
<img src="./public/assets/Tela de Membros.png" alt="Texto Alternativo">

## Como Executar o Projeto

Clone este repositório:

```git clone https://github.com/Wellington-Silva/Interface-Chat.git```

### Inicie o servidor:

npm start

Abra http://localhost:3000 no navegador para acessar a aplicação.

## Contribuições

São bem-vindas melhorias, correções e novas funcionalidades. Por favor, envie um pull request ou abra uma issue para discutirmos sua proposta.
