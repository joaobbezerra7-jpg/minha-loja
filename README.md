# 🖥️ MINHA-LOJA

Sistema de loja virtual desenvolvido com **Angular + FastAPI + MySQL**, com foco no gerenciamento de produtos, clientes, carrinho de compras e pedidos.

O projeto integra **frontend, backend e banco de dados**, permitindo realizar o fluxo completo de uma compra.

---

## 📌 Sobre o projeto

O **MINHA-LOJA** é uma aplicação web de comércio eletrônico desenvolvida para praticar e integrar conceitos de:

* Desenvolvimento Front-end
* Desenvolvimento Back-end
* APIs REST
* Banco de dados relacional
* Integração entre sistemas
* Persistência de dados
* Arquitetura em camadas
* Git e GitHub

O sistema possui cadastro de pessoas, gerenciamento de produtos e setores, carrinho persistente e gerenciamento de pedidos.

---

# 🛠️ Tecnologias utilizadas

## Front-end

* **Angular**
* **TypeScript**
* HTML
* CSS
* Angular Router
* HttpClient
* RxJS

## Back-end

* **Python**
* **FastAPI**
* **SQLAlchemy**
* **Pydantic**
* **PyMySQL**
* **Uvicorn**

## Banco de dados

* **MySQL / MariaDB**

## Ferramentas

* Visual Studio Code
* Git
* GitHub
* XAMPP
* Swagger / OpenAPI

---

# 🏗️ Arquitetura

O projeto utiliza uma separação entre as principais responsabilidades da aplicação.

### Front-end

```text
Angular
│
├── Components
│   ├── Cadastro
│   ├── Loja
│   ├── Produto
│   ├── Setor
│   ├── Carrinho
│   └── Pedidos
│
├── Services
│   ├── ClienteService
│   ├── ProdutoService
│   ├── CarrinhoService
│   ├── PedidoService
│   └── PedidoProdutoService
│
└── Models
```

### Back-end

```text
FastAPI
│
├── Routes
├── Controllers
├── Services
├── Repositories
├── Models
├── Schemas
└── Database
```

Essa organização permite separar:

* Rotas e endpoints
* Regras de negócio
* Acesso ao banco
* Modelagem dos dados
* Validação das requisições

---

# 🛒 Fluxo principal da aplicação

O fluxo principal implementado é:

```text
Cadastro de pessoa
        ↓
       Loja
        ↓
Selecionar produto
        ↓
Adicionar ao carrinho
        ↓
      Carrinho
        ↓
 Finalizar pedido
        ↓
      Pedido
        ↓
 Produtos do pedido
        ↓
 Atualização do estoque
        ↓
Finalização do carrinho
        ↓
 Histórico de pedidos
```

---

# 👤 Cadastro de pessoa

O sistema possui uma tela de cadastro de clientes.

As informações são enviadas para o backend e persistidas no banco de dados.

O cadastro utiliza integração com a API **ViaCEP** para auxiliar no preenchimento dos dados de endereço.

---

# 📦 Produtos

O sistema possui gerenciamento de produtos.

Cada produto possui informações como:

* ID
* Nome
* Descrição
* Valor unitário
* Unidade
* Estoque
* Setor/categoria
* Foto

O front-end utiliza o `ProdutoService` para realizar a comunicação com a API.

Exemplos de operações:

```text
GET     /produtos/
GET     /produtos/{idproduto}
POST    /produtos/
PUT     /produtos/{idproduto}
DELETE  /produtos/{idproduto}
```

---

# 🏷️ Setores

O sistema também possui cadastro e listagem de setores/categorias.

Os setores são utilizados na organização dos produtos.

---

# 🛒 Carrinho de compras

O carrinho possui **persistência no banco de dados**.

A aplicação utiliza as tabelas:

```text
carrinho
carrinho_produto
```

### Tabela `carrinho`

Responsável por representar o carrinho pertencente a uma pessoa.

Principais campos:

```text
idcarrinho
idpessoa
data_criacao
status_carrinho
```

### Tabela `carrinho_produto`

Relaciona os produtos ao carrinho.

Principais campos:

```text
idcarrinho
idproduto
quantidade
```

---

# 🔄 Funcionamento do carrinho

Quando um produto é adicionado:

```text
Produto
   ↓
POST /carrinho/{idpessoa}/produtos
   ↓
Carrinho ativo
   ↓
Produto + quantidade
```

Se o produto já estiver no carrinho, sua quantidade é atualizada em vez de criar uma duplicação.

Também é possível:

* Aumentar quantidade
* Diminuir quantidade
* Remover produto
* Consultar carrinho
* Calcular total
* Finalizar carrinho

---

# 📋 Endpoints do carrinho

```text
POST   /carrinho/{idpessoa}/produtos
GET    /carrinho/{idpessoa}
PUT    /carrinho/{idpessoa}/produtos/{idproduto}
DELETE /carrinho/{idpessoa}/produtos/{idproduto}
GET    /carrinho/{idpessoa}/total
PUT    /carrinho/{idpessoa}/finalizar
```

---

# 📦 Regra de estoque

Uma regra importante implementada no projeto é:

> **Adicionar um produto ao carrinho não diminui o estoque.**

O estoque é alterado somente quando o produto é efetivamente adicionado a um pedido.

Exemplo:

```text
Adicionar ao carrinho
        ↓
Estoque permanece igual
        ↓
Finalizar pedido
        ↓
Produto adicionado ao pedido
        ↓
Estoque é reduzido
```

Essa regra evita que um simples produto colocado no carrinho seja considerado imediatamente como vendido.

---

# 🧾 Pedidos

Ao finalizar uma compra, o sistema cria um pedido.

O pedido possui informações como:

```text
idpedido
idpessoa
data_pedido
status_pedido
```

Os produtos pertencentes ao pedido são armazenados separadamente através da relação:

```text
Pedido
   ↓
PedidoProduto
   ↓
Produto
```

---

# 💰 Produtos do pedido

Cada item do pedido registra:

```text
idpedido
idproduto
quantidade
valor_unitario
```

Isso permite calcular o subtotal de cada produto:

```text
valor_unitario × quantidade
```

E posteriormente o total do pedido.

---

# 🔐 Fluxo de finalização

Quando o usuário clica em **Finalizar pedido**, o Angular realiza as seguintes operações:

```text
1. Verifica se o carrinho possui produtos
        ↓
2. Identifica a pessoa
        ↓
3. Cria o pedido
        ↓
4. Adiciona os produtos ao pedido
        ↓
5. Atualiza o estoque
        ↓
6. Finaliza o carrinho
        ↓
7. Limpa o carrinho na interface
        ↓
8. Redireciona para Meus Pedidos
```

Depois da finalização, o carrinho passa para:

```text
status_carrinho = "FINALIZADO"
```

Um novo carrinho ativo pode ser criado posteriormente para uma nova compra.

---

# 📜 Histórico de pedidos

A tela **Meus Pedidos** apresenta os pedidos associados à pessoa atualmente identificada.

Cada pedido pode apresentar:

* Número do pedido
* Data
* Status
* Produtos
* Quantidades
* Valor unitário
* Subtotal
* Total do pedido

Exemplo:

```text
Pedido #14

Data: 15/09/2026
Status: Aberto

Produto #1
Quantidade: 1
Valor unitário: R$ 2.111,00

Total: R$ 2.111,00
```

---

# 🔌 Comunicação Front-end ↔ Back-end

O Angular realiza requisições HTTP para a API FastAPI.

Exemplo:

```text
Angular
   │
   │ HTTP
   ↓
FastAPI
   │
   ↓
Service
   │
   ↓
Repository
   │
   ↓
MySQL / MariaDB
```

A comunicação utiliza métodos HTTP como:

```text
GET
POST
PUT
DELETE
```

---

# 🧪 Testes realizados

Durante o desenvolvimento, foram realizados testes utilizando a aplicação Angular e o Swagger da API.

### Carrinho

* [x] Criar carrinho automaticamente
* [x] Adicionar produto
* [x] Adicionar produto já existente
* [x] Atualizar quantidade
* [x] Remover produto
* [x] Validar quantidade maior que zero
* [x] Validar estoque disponível
* [x] Calcular total
* [x] Finalizar carrinho
* [x] Criar novo carrinho após finalização

### Pedidos

* [x] Criar pedido
* [x] Adicionar produtos ao pedido
* [x] Atualizar estoque
* [x] Exibir pedido no histórico
* [x] Exibir produtos do pedido
* [x] Calcular total do pedido

### Integração

* [x] Angular → FastAPI
* [x] FastAPI → MySQL/MariaDB
* [x] Carrinho persistido no banco
* [x] Pedido persistido no banco
* [x] Histórico carregado pela API
* [x] Finalização do pedido funcionando sem erros no console

---

# 🚀 Como executar o projeto

## 1. Banco de dados

Inicie o MySQL/MariaDB através do XAMPP.

O projeto utiliza:

```text
Host: localhost
Porta: 3307
Banco: bd_loja_esportiva
```

Certifique-se de que o banco esteja disponível antes de iniciar o backend.

---

## 2. Back-end

Entre na pasta do backend:

```bash
cd E:\back-end_aplicacao.carrinho
```

Instale as dependências necessárias:

```bash
py -m pip install fastapi uvicorn sqlalchemy pymysql pydantic
```

Execute a aplicação:

```bash
py -m uvicorn main:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

Documentação Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 3. Front-end

Entre na pasta do projeto Angular:

```bash
cd caminho\do\projeto\MINHA-LOJA
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

---

# 📁 Principais rotas do Front-end

```text
/                  → Redireciona para cadastro
/cadastro          → Cadastro de pessoa
/loja              → Loja
/lista             → Lista de produtos
/produto           → Cadastro de produto
/setor-lista       → Lista de setores
/setor-cadastro    → Cadastro de setor
/carrinho          → Carrinho
/pedidos           → Histórico de pedidos
```

---

# 🔗 Principais endpoints da API

### Pessoas

```text
/pessoa/
```

### Produtos

```text
/produtos/
```

### Setores

```text
/setor/
```

### Carrinho

```text
/carrinho/
```

### Pedidos

```text
/pedidos/
```

### Produtos do pedido

```text
/pedidoproduto/
```

---

# 📚 Objetivos de aprendizagem

O projeto foi desenvolvido também como uma forma prática de estudar e aplicar conceitos de desenvolvimento de software, incluindo:

* Angular
* TypeScript
* Python
* FastAPI
* APIs REST
* HTTP
* SQL
* MySQL/MariaDB
* SQLAlchemy
* ORM
* Pydantic
* Arquitetura em camadas
* Repository Pattern
* Services
* Controllers
* Git
* GitHub
* Integração Front-end/Back-end
* Persistência de dados
* Modelagem relacional

---

# 📌 Estado atual do projeto

O fluxo principal de compra está funcional:

```text
👤 Pessoa
   ↓
🛍️ Loja
   ↓
📦 Produto
   ↓
🛒 Carrinho
   ↓
🧾 Pedido
   ↓
📦 Estoque
   ↓
📜 Histórico
```

A integração entre **Angular, FastAPI e MySQL/MariaDB** foi validada através de testes na aplicação e na API.

---

# 🔮 Próximos passos

Possíveis etapas futuras do projeto:

* Melhorar tratamento de erros
* Melhorar estados de carregamento
* Aprimorar validações
* Revisar regras de negócio
* Criar testes automatizados
* Melhorar autenticação/login
* Revisar segurança da aplicação
* Melhorar experiência do usuário
* Documentar completamente a API
* Revisar arquitetura e código
* Preparar aplicação para deploy

---

# 👨‍💻 Desenvolvimento

Projeto desenvolvido como parte do processo de aprendizagem e prática em desenvolvimento de sistemas web, integrando **Front-end, Back-end, Banco de Dados e Engenharia de Software**.
