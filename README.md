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
cd desafio-aposta-tudo
```

### 2️⃣ Subindo toda a aplicação

**Com um único comando**, suba a API, Frontend e Banco de Dados:

``` bash
docker-compose up --build -d
```

Este comando irá:
- 🗄️ Criar e inicializar o banco de dados PostgreSQL
- 🔄 Aplicar as migrações do Prisma automaticamente
- 🚀 Iniciar a API NestJS
- 🎨 Iniciar o Frontend Nuxt.js

### 3️⃣ Acessando a aplicação

Após a execução, os serviços estarão disponíveis em:

- **Frontend:** http://localhost:8080
- **API:** http://localhost:3000
- **Swagger (Documentação da API):** http://localhost:3000/api#/
- **Banco de Dados:** localhost:5432

### 4️⃣ Comandos úteis

``` bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f nest-api
docker-compose logs -f nuxt-frontend

# Ver status dos containers
docker-compose ps

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (limpa o banco de dados)
docker-compose down -v
```

------------------------------------------------------------------------

## 🧪 Executando os testes

Os testes podem ser executados tanto no **frontend** quanto na **API**.

### Testes da API

Entre na pasta da API e execute:

``` bash
cd api
npm install  # Instalar dependências (se ainda não instalou)
npm run test
```

Para executar os testes com cobertura:

``` bash
npm run test:cov
```

### Testes do Frontend

Entre na pasta do frontend e execute:

``` bash
cd front
npm install  # Instalar dependências (se ainda não instalou)
npm run test
```

Para executar os testes com interface visual:

``` bash
npm run test:ui
```

Para executar os testes com cobertura:

``` bash
npm run test:coverage
```

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas

### Backend (API)

-   **NestJS** v11.0.1 - Framework Node.js progressivo
-   **Prisma** v6.14.0 - ORM moderno para TypeScript
-   **PostgreSQL** 13 - Banco de dados relacional
-   **TypeScript** - Superset JavaScript tipado
-   **Swagger** - Documentação automática da API
-   **Jest** - Framework de testes
-   **Class Validator & Class Transformer** - Validação de dados

### Frontend

-   **Nuxt.js** v4.3.1 - Framework Vue.js para SSR/SSG
-   **Vue.js** v3.5.27 - Framework JavaScript progressivo
-   **TypeScript** - Linguagem tipada
-   **Tailwind CSS** v6.14.0 - Framework CSS utilitário
-   **Vitest** v4.0.18 - Framework de testes moderno
-   **Vue Test Utils** v2.4.6 - Utilitários para testes de componentes
-   **VueUse** v14.2.0 - Coleção de composables Vue

### Infraestrutura

-   **Docker** - Containerização
-   **Docker Compose** - Orquestração de containers
-   **Node.js** 20 Alpine (Frontend) / LTS Alpine 3.20 (Backend)

------------------------------------------------------------------------

## 🏗️ Principais Decisões Técnicas

### Arquitetura e Organização

#### Backend (NestJS)
-   **Arquitetura modular**: Cada funcionalidade (níveis, profissionais) possui seu próprio módulo, seguindo os princípios SOLID
-   **Repository Pattern**: Separação clara entre camada de dados e lógica de negócio
-   **DTOs (Data Transfer Objects)**: Validação e transformação de dados com class-validator
-   **Prisma ORM**: Escolhido pela type-safety, migrations automáticas e excelente DX (Developer Experience)
-   **Swagger/OpenAPI**: Documentação automática da API, facilitando integração

#### Frontend (Nuxt.js)
-   **Componentes atômicos**: Estrutura bem definida com componentes reutilizáveis
-   **TypeScript**: Type-safety em todo o projeto
-   **Tailwind CSS**: Estilização rápida e consistente
-   **Vitest**: Framework de testes moderno e rápido, com suporte nativo a ESM

### Infraestrutura
-   **Docker Multi-stage builds**: Otimização do tamanho das imagens
-   **Docker Compose centralizado**: Gerenciamento simplificado com um único comando
-   **Health Checks**: Garantia de que o banco de dados está pronto antes de iniciar a API
-   **Migrations automáticas**: Container dedicado para aplicar migrations do Prisma
-   **Network compartilhada**: Comunicação eficiente entre containers

### Boas Práticas
-   **Separação de responsabilidades**: Backend e frontend completamente desacoplados
-   **Validação em camadas**: Validação tanto no frontend quanto no backend
-   **Tratamento de erros**: Error handling consistente com mensagens claras
-   **Paginação e busca**: Implementadas de forma eficiente no backend
-   **Testes unitários**: Cobertura de testes para componentes e lógica crítica

## 🧪 Como Testar a Aplicação

### Testes Manuais

1. **Acesse o Frontend** em http://localhost:8080
2. **Teste as funcionalidades**:
   - ➕ Cadastro de profissionais e níveis
   - ✏️ Edição de registros
   - 🗑️ Exclusão de registros
   - 🔍 Busca por nome
   - 📄 Paginação de resultados
3. **Verifique a API** através do Swagger em http://localhost:3000/api#/

### Testes Automatizados

#### API (Backend)
```bash
cd api
npm run test          # Testes unitários
npm run test:cov      # Testes com cobertura
```

#### Frontend
```bash
cd front
npm run test              # Testes unitários
npm run test:ui           # Interface visual de testes
npm run test:coverage     # Testes com cobertura
```

### Testes de API via cURL

```bash
# Listar profissionais
curl http://localhost:3000/api/profissionais

# Listar níveis
curl http://localhost:3000/api/niveis

# Criar um profissional
curl -X POST http://localhost:3000/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva", "nivelId":1}'
```

## 📌 Observações

-   Certifique-se de que as portas **3000** (API), **5432** (PostgreSQL) e **8080** (Frontend) estejam livres
-   Os containers são criados em modo *detached* (`-d`), portanto rodam em background
-   O banco de dados PostgreSQL persiste os dados em um volume Docker
-   As migrations são aplicadas automaticamente ao iniciar a aplicação
-   O frontend faz requisições para a API via variável de ambiente `NUXT_PUBLIC_API_BASE`

## 🔧 Solução de Problemas

- **Erro de conexão com banco de dados**: Verifique se a porta 5432 não está em uso
- **Frontend não conecta na API**: Verifique se a variável `NUXT_PUBLIC_API_BASE` está correta
- **Migrations falhando**: Execute `docker-compose down -v` para limpar volumes e recrie os containers

------------------------------------------------------------------------

## 👨‍💻 Autor

Desenvolvido por **Bruno Mello**\
🔗 GitHub: https://github.com/BrunomelloxD
