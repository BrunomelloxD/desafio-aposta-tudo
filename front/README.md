# 🏗️ Frontend - Clean Architecture

Sistema de Gestão APOSTATUDO - Frontend refatorado com **Clean Architecture**

## 🎯 Sobre o Projeto

Este é o frontend do Sistema de Gestão APOSTATUDO, construído com **Nuxt 3** e **TypeScript**, seguindo os princípios de **Clean Architecture** para garantir:

- ✅ Código organizado e escalável
- ✅ Alta testabilidade
- ✅ Independência de framework
- ✅ Manutenção facilitada
- ✅ Separação clara de responsabilidades

## 📁 Estrutura do Projeto

```
front/
├── src/                          # 🆕 NOVA ESTRUTURA (Clean Architecture)
│   ├── ui/
│   │   ├── app/modules/          # Módulos por domínio
│   │   │   ├── nivel/            # Módulo de Níveis
│   │   │   │   ├── domain/       # Entidades e tipos
│   │   │   │   ├── infrastructure/ # Repositórios
│   │   │   │   ├── usecase/      # Casos de uso
│   │   │   │   └── ui/           # Composables e componentes
│   │   │   └── profissional/     # Módulo de Profissionais
│   │   ├── pages/                # Páginas Nuxt
│   │   ├── layouts/              # Layouts Nuxt
│   │   └── components/           # Componentes compartilhados
│   └── shared/                   # Código compartilhado
│       ├── http/                 # Serviços HTTP
│       ├── error/                # Tratamento de erros
│       ├── utils/                # Utilitários
│       └── composables/          # Composables compartilhados
│
├── composables/                  # ⚠️ Compatibilidade (a migrar)
├── components/                   # ⚠️ Compatibilidade (a migrar)
├── pages/                        # ⚠️ Compatibilidade (a migrar)
├── layouts/                      # ⚠️ Compatibilidade (a migrar)
├── utils/                        # ⚠️ Compatibilidade (a migrar)
├── types/                        # ⚠️ Compatibilidade (a migrar)
│
├── tests/                        # Testes
│   ├── unit/                     # Testes unitários
│   │   ├── modules/              # Testes por módulo
│   │   └── shared/               # Testes de compartilhados
│   └── e2e/                      # Testes end-to-end
│
├── nuxt.config.ts                # Configuração do Nuxt
├── tailwind.config.js            # Configuração do Tailwind
├── tsconfig.json                 # Configuração do TypeScript
├── vitest.config.ts              # Configuração de testes
│
└── 📚 DOCUMENTAÇÃO
    ├── ARCHITECTURE.md           # Guia completo da arquitetura
    ├── ARCHITECTURE_DIAGRAM.md   # Diagramas e fluxos
    ├── MIGRATION.md              # Guia de migração
    ├── TESTING_GUIDE.md          # Guia de testes
    └── REFACTORING_SUMMARY.md    # Resumo da refatoração
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Variáveis de Ambiente

```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
```

## 🏛️ Arquitetura

O projeto segue **Clean Architecture** com 4 camadas principais:

### 1. 🧠 Domain Layer
Entidades e regras de negócio puras

```typescript
// src/ui/app/modules/nivel/domain/Nivel.ts
export class Nivel {
  static validateNome(nome: string): boolean {
    return nome.trim().length > 0
  }
}
```

### 2. ⚙️ Infrastructure Layer
Comunicação com APIs e fontes de dados

```typescript
// src/ui/app/modules/nivel/infrastructure/NivelRepository.ts
export class NivelRepository {
  async findAll(page: number, limit: number): Promise<PaginatedResponse<Nivel>> {
    return this.httpService.get('/api/niveis', { page, limit })
  }
}
```

### 3. 🎯 Use Case Layer
Orquestração de regras de negócio

```typescript
// src/ui/app/modules/nivel/usecase/CreateNivel.ts
export class CreateNivelUseCase {
  async execute(nome: string): Promise<Nivel> {
    if (!Nivel.validateNome(nome)) {
      throw new Error('Nome inválido')
    }
    return this.repository.create(nome)
  }
}
```

### 4. 🎨 UI Layer
Interface Vue/Nuxt e composables

```typescript
// src/ui/app/modules/nivel/ui/composables/useNivelModule.ts
export const useNivelModule = () => {
  const { fetchNiveis, createNivel, updateNivel, deleteNivel } = ...
  return { fetchNiveis, createNivel, updateNivel, deleteNivel }
}
```

## 📦 Módulos Disponíveis

### Nivel (Níveis Profissionais)
- **Domain**: `src/ui/app/modules/nivel/domain/`
- **Use Cases**: GetNiveis, CreateNivel, UpdateNivel, DeleteNivel
- **UI**: `useNivelModule()`

### Profissional (Profissionais Cadastrados)
- **Domain**: `src/ui/app/modules/profissional/domain/`
- **Use Cases**: GetProfissionais, CreateProfissional, UpdateProfissional, DeleteProfissional
- **UI**: `useProfissionalModule()`

## 💡 Como Usar

### Em Componentes Vue

```vue
<script setup lang="ts">
import { useNivelModule } from '~/src/ui/app/modules/nivel'
import { usePagination } from '~/src/shared/composables/usePagination'

const { fetchNiveis, createNivel } = useNivelModule()
const { currentPage, limit } = usePagination()

// Buscar níveis
const { data: niveis } = await fetchNiveis(currentPage.value, limit.value)

// Criar novo nível
await createNivel('Nível Sênior')
</script>
```

### Importações

```typescript
// Módulos
import { useNivelModule } from '~/src/ui/app/modules/nivel'
import { useProfissionalModule } from '~/src/ui/app/modules/profissional'

// Compartilhados
import { usePagination, useSearch, useNotification } from '~/src/shared'
import { PAGINATION, formatDate } from '~/src/shared'

// Tipos
import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
```

## 🧪 Testes

```bash
# Rodar todos os testes
npm run test

# Testes com cobertura
npm run test:coverage

# Testes em watch mode
npm run test:watch

# Testes específicos
npm run test tests/unit/modules/nivel/
```

Consulte [TESTING_GUIDE.md](./TESTING_GUIDE.md) para detalhes.

## 📚 Documentação Completa

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Guia completo da arquitetura
- **[ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)** - Diagramas visuais
- **[MIGRATION.md](./MIGRATION.md)** - Como migrar código antigo
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Estratégias de teste
- **[REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)** - Resumo da refatoração

## 🛠️ Stack Tecnológica

- **Framework**: Nuxt 3
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Testes**: Vitest
- **Arquitetura**: Clean Architecture

## 🎯 Próximos Passos

1. Migrar páginas e componentes restantes
2. Aumentar cobertura de testes para 80%+
3. Implementar testes E2E
4. Adicionar mais módulos seguindo o padrão
5. Documentar componentes complexos

## 🤝 Contribuindo

Ao adicionar novos recursos:

1. **Identifique o módulo** (existente ou novo)
2. **Crie na camada Domain** (tipos, entidades, validações)
3. **Implemente Infrastructure** (repositórios, APIs)
4. **Desenvolva Use Cases** (regras de negócio)
5. **Crie UI** (composables, componentes, páginas)
6. **Escreva testes** para cada camada
7. **Documente** o novo recurso

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para guia detalhado.

## 📊 Status do Projeto

- [x] ✅ Estrutura Clean Architecture implementada
- [x] ✅ Módulo Nivel completo
- [x] ✅ Módulo Profissional completo
- [x] ✅ Shared utilities migrados
- [x] ✅ Documentação criada
- [x] ✅ Exemplos de testes
- [ ] 🔄 Migração completa de páginas
- [ ] 🔄 Aumentar cobertura de testes
- [ ] 🔄 Testes E2E

## 📞 Suporte

Para dúvidas sobre a arquitetura:
1. Consulte a documentação em `ARCHITECTURE.md`
2. Veja os exemplos nos módulos existentes
3. Revise os testes de exemplo

---

**Desenvolvido com ❤️ seguindo Clean Architecture principles**
