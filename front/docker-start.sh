#!/bin/bash

# Script para iniciar o projeto com Docker
# Uso: ./docker-start.sh

# Verificar se .env existe, senão criar
if [ ! -f .env ]; then
    echo "Criando arquivo .env"
    cp .env.docker .env
fi

# Build e start
echo "Building e iniciando containers..."
docker-compose up -d --build

# Aguardar alguns segundos
sleep 3

# Verificar status
if docker-compose ps | grep -q "Up"; then
    echo "Aplicação iniciada com sucesso!"
    echo "Acesse: http://localhost:8080"
    echo ""
    echo "Comandos úteis:"
    echo "  docker-compose logs -f     # Ver logs"
    echo "  docker-compose down        # Parar"
    echo "  docker-compose restart     # Reiniciar"
else
    echo "Erro ao iniciar. Verifique os logs:"
    docker-compose logs
    exit 1
fi
