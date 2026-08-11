# 📦 Estoque Mobile

## 👥 Integrantes do Grupo
* **Carlos Henrique de Araujo Nunes** - GitHub: [CarlosHenriiique021](https://github.com/CarlosHenriiique021)
* **Matheus de Matos Paes da Silva** - GitHub: [MatheusDev0705](https://github.com/MatheusDev0705)
* **Flávio Leandro Cézar Ferreira de Lima** - GitHub: [agregor2012](https://github.com/agregor2012)
* **Kayo Eduardo de Oliveira Dantas** - GitHub: [Kayo-Dantas](https://github.com/Kayo-Dantas)
---

## 📄 Descrição do Sistema
O **Estoque Mobile** é uma aplicação mobile desenvolvida em React Native para a disciplina de Desenvolvimento Mobile. O objetivo principal do projeto é oferecer um **Sistema de Gerenciamento de Estoque e Usuários**, unindo uma experiência de navegação fluida com a persistência de dados local.

O aplicativo conta com controle de autenticação simulada, permitindo que múltiplos usuários se cadastrem e gerenciem seus perfis. Na área logada, o sistema oferece um CRUD completo para o controle de produtos (estoque), além de telas institucionais para apresentação da equipe de desenvolvedores e contato direto via API do WhatsApp.

---

## 🛠️ Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes tecnologias e bibliotecas obrigatórias:
* **React Native** (Componentes Funcionais e Hooks como `useState`)
* **Expo** (Ambiente de desenvolvimento e execução)
* **React Navigation** 
  * `Stack Navigator` (Fluxo de autenticação e telas internas)
  * `Bottom Tab Navigator` (Navegação principal por abas pós-login)
* **AsyncStorage** (Persistência local e segura de dados de usuários e produtos)
* **Linking** (Integração com o aplicativo do WhatsApp)

---

## 🚀 Funcionalidades Principais
* **Autenticação Simulada:** Tela de login integrada ao AsyncStorage para validação de credenciais e cadastro de novos usuários com regras de validação (senha de no mínimo 6 dígitos, e-mail único, etc.).
* **CRUD de Usuários:** Listagem, busca, edição, visualização e exclusão (com confirmação) de usuários na aba de Perfil.
* **CRUD de Produtos:** Módulo completo de estoque permitindo cadastrar, listar, buscar por nome, editar e excluir produtos (Nome, Descrição, Categoria, Quantidade e Valor).
* **Tela de Desenvolvedores:** Apresentação da equipe com foto/avatar, função e mini biografia.
* **Fale Conosco:** Informações da empresa institucional e botão integrado para abrir conversa direta no WhatsApp.

---

## 📂 Estrutura do Projeto
A arquitetura do código segue rigorosamente o padrão solicitado:
```text
src
├── contexts
├── screens
│   ├── Login
│   ├── CadastroUsuario
│   ├── Home
│   ├── Produtos
│   ├── CadastroProduto
│   ├── EditarProduto
│   ├── Perfil
│   ├── Usuarios
│   ├── EditarUsuario
│   ├── Desenvolvedores
│   └── Fale Conosco
├── routes
│   ├── StackRoutes
│   └── TabRoutes
├── services
│   └── storage.js
└── styles
App.js
```
---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

* **Node.js**
* **npm**
* **Expo CLI** (caso necessário)
* **Expo Go** no celular, caso queira executar o aplicativo em um dispositivo físico

### 1. Clone o repositório

```bash
git clone https://github.com/CarlosHenriiique021/Estoque_Mobile.git
```

### 2. Acesse a pasta do projeto

```bash
cd Estoque_Mobile
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie a aplicação

```bash
npx expo start
```

Após executar o comando, o Expo exibirá um **QR Code** no terminal.

### 5. Execute o aplicativo

Você pode executar o projeto de diferentes formas:

* **Dispositivo físico:** abra o aplicativo **Expo Go** no celular e escaneie o QR Code exibido no terminal.
* **Emulador Android:** pressione `a` no terminal para abrir a aplicação no emulador Android.
* **Navegador:** pressione `w` no terminal para executar a aplicação pelo navegador.

> **Dica:** Para executar pelo celular utilizando o Expo Go, certifique-se de que o computador e o dispositivo estejam conectados à mesma rede Wi-Fi.

