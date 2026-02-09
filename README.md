# Desafio Aposta Tudo

Este projeto foi desenvolvido como parte de um **teste técnico** para
vaga de desenvolvedor.\
A aplicação é composta por **API (backend)** e **Frontend**, ambos
containerizados com **Docker**.

------------------------------------------------------------------------

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/)
-   [Node.js](https://nodejs.org/) (necessário apenas para rodar testes
    localmente)

------------------------------------------------------------------------

## 🚀 Como executar o projeto

### 1️⃣ Clone o repositório

``` bash
git clone https://github.com/BrunomelloxD/desafio-aposta-tudo.git
```

``` bash
cd desafio-aposta-tudo
```

------------------------------------------------------------------------

### 2️⃣ Subindo a API

Entre na pasta da API:

``` bash
cd api
```

Suba o container da API:

``` bash
docker-compose up --build -d
```

A API estará disponível em: - **Swagger:** http://localhost:3000/api#/

------------------------------------------------------------------------

### 3️⃣ Subindo o Frontend

Volte para a raiz do projeto e entre na pasta do front:

``` bash
cd .. && cd front
```

Suba o container do frontend:

``` bash
docker-compose up --build -d
```

O frontend estará disponível em: - **Aplicação:** http://localhost:8080/

------------------------------------------------------------------------

## 🧪 Executando os testes

Os testes podem ser executados tanto no **frontend** quanto na **API**.

Entre na pasta desejada (`api` ou `front`) e execute:

``` bash
npm run test
```

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas

### Backend

-   **NestJS**
-   **PostgreSQL**
-   **Node.js**
-   **Swagger** (documentação da API)

### Frontend

-   **Nuxt.js**
-   **JavaScript**

### Infraestrutura

-   **Docker**
-   **Docker Compose**

------------------------------------------------------------------------

## 📌 Observações

-   Certifique-se de que as portas **3000** (API) e **8080** (Frontend)
    estejam livres.
-   Os containers são criados em modo *detached* (`-d`), portanto rodam
    em background.

------------------------------------------------------------------------

## 👨‍💻 Autor

Desenvolvido por **Bruno Mello**\
🔗 GitHub: https://github.com/BrunomelloxD
