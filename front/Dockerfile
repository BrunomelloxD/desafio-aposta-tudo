# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copiar apenas o necessário do build
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package*.json ./

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

# Expor porta
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", ".output/server/index.mjs"]
