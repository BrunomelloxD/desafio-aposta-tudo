# 🧪 Guia de Testes - Clean Architecture

## Estratégia de Testes por Camada

### 1️⃣ Domain Layer - Testes Unitários Puros

**Objetivo**: Testar entidades e validações de negócio

**Características**:
- ✅ Sem dependências externas
- ✅ Muito rápidos
- ✅ Fáceis de escrever
- ✅ Alta cobertura

**Exemplo**: `Nivel.entity.test.ts`

```typescript
describe('Nivel Entity', () => {
  it('deve validar nome corretamente', () => {
    expect(Nivel.validateNome('Júnior')).toBe(true)
    expect(Nivel.validateNome('')).toBe(false)
  })
})
```

### 2️⃣ Use Case Layer - Testes com Mock de Repository

**Objetivo**: Testar lógica de negócio e orquestração

**Características**:
- ✅ Mock do Repository
- ✅ Testa fluxo de dados
- ✅ Valida regras de negócio
- ✅ Independente de infraestrutura

**Exemplo**: `CreateNivel.usecase.test.ts`

```typescript
describe('CreateNivelUseCase', () => {
  it('deve criar nível com validação', async () => {
    const mockRepo = { create: vi.fn() }
    const useCase = new CreateNivelUseCase(mockRepo)
    
    await useCase.execute('Pleno')
    
    expect(mockRepo.create).toHaveBeenCalledWith('Pleno')
  })
})
```

### 3️⃣ Infrastructure Layer - Testes de Integração

**Objetivo**: Testar comunicação com APIs e fontes de dados

**Características**:
- ✅ Mock do HttpService ou API
- ✅ Testa conversão de dados
- ✅ Valida chamadas HTTP
- ✅ Simula erros de rede

**Exemplo**: `NivelRepository.test.ts`

```typescript
describe('NivelRepository', () => {
  it('deve buscar níveis da API', async () => {
    const mockHttp = { get: vi.fn() }
    const repo = new NivelRepository('http://api')
    
    await repo.findAll(1, 10)
    
    expect(mockHttp.get).toHaveBeenCalled()
  })
})
```

### 4️⃣ UI Layer - Testes de Componentes e Composables

**Objetivo**: Testar interface e interação

**Características**:
- ✅ Mock dos Use Cases
- ✅ Testa reatividade Vue
- ✅ Simula interações do usuário
- ✅ Valida renderização

**Exemplo**: `useNivelModule.test.ts`

```typescript
describe('useNivelModule', () => {
  it('deve expor métodos corretos', () => {
    const { fetchNiveis, createNivel } = useNivelModule()
    
    expect(fetchNiveis).toBeDefined()
    expect(createNivel).toBeDefined()
  })
})
```

## 📁 Estrutura de Testes

```
tests/
├── unit/
│   ├── modules/
│   │   ├── nivel/
│   │   │   ├── Nivel.entity.test.ts        # Domain
│   │   │   ├── CreateNivel.usecase.test.ts # Use Case
│   │   │   ├── NivelRepository.test.ts     # Infrastructure
│   │   │   └── useNivelModule.test.ts      # UI
│   │   └── profissional/
│   │       └── ...
│   └── shared/
│       ├── usePagination.test.ts
│       ├── useSearch.test.ts
│       └── formatters.test.ts
└── e2e/
    ├── niveis.spec.ts
    └── profissionais.spec.ts
```

## 🎯 Pirâmide de Testes

```
        ╱╲
       ╱E2E╲        ← Poucos testes, lentos, alto valor
      ╱─────╲
     ╱ Integ ╲      ← Médio número, velocidade média
    ╱─────────╲
   ╱   Unit    ╲    ← Muitos testes, rápidos, base sólida
  ╱─────────────╲
```

## 🛠️ Comandos de Teste

```bash
# Rodar todos os testes
npm run test

# Rodar testes com coverage
npm run test:coverage

# Rodar testes em watch mode
npm run test:watch

# Rodar testes de um arquivo específico
npm run test tests/unit/modules/nivel/Nivel.entity.test.ts
```

## ✅ Checklist de Testes

### Domain Layer
- [ ] Validações de entidade
- [ ] Criação de instâncias
- [ ] Conversão para JSON
- [ ] Regras de negócio

### Use Case Layer
- [ ] Fluxo feliz (happy path)
- [ ] Validações de entrada
- [ ] Tratamento de erros
- [ ] Chamadas ao repository

### Infrastructure Layer
- [ ] Chamadas HTTP corretas
- [ ] Conversão de dados
- [ ] Tratamento de erros de rede
- [ ] Parâmetros de requisição

### UI Layer
- [ ] Composables funcionais
- [ ] Reatividade
- [ ] Integração com use cases
- [ ] Estados de loading/erro

## 📊 Cobertura de Testes

Objetivo de cobertura por camada:

| Camada | Cobertura Mínima | Cobertura Ideal |
|--------|------------------|-----------------|
| Domain | 90% | 100% |
| Use Case | 85% | 95% |
| Infrastructure | 70% | 85% |
| UI | 60% | 80% |

## 🧩 Padrões de Mock

### Mock de Repository

```typescript
const mockRepository: INivelRepository = {
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn()
}
```

### Mock de HttpService

```typescript
const mockHttpService = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
}
```

### Mock de Use Case

```typescript
const mockUseCase = {
  execute: vi.fn()
}
```

## 🔍 Exemplos de Asserções

### Validação de Chamadas

```typescript
expect(mockRepository.create).toHaveBeenCalledWith('Pleno')
expect(mockRepository.create).toHaveBeenCalledTimes(1)
```

### Validação de Retorno

```typescript
expect(result).toEqual({ id: '1', nivel: 'Pleno' })
expect(result).toBeInstanceOf(Nivel)
```

### Validação de Erros

```typescript
await expect(useCase.execute('')).rejects.toThrow('Nome inválido')
```

## 🎓 Best Practices

1. **Arrange, Act, Assert (AAA)**
   ```typescript
   // Arrange - preparar
   const mockRepo = { create: vi.fn() }
   
   // Act - executar
   const result = await useCase.execute('Pleno')
   
   // Assert - validar
   expect(result).toBeDefined()
   ```

2. **Testes Isolados**
   - Cada teste deve ser independente
   - Use `beforeEach` para setup
   - Limpe mocks entre testes

3. **Nomes Descritivos**
   ```typescript
   it('deve criar nível quando nome é válido')
   it('deve lançar erro quando nome está vazio')
   ```

4. **Um Conceito por Teste**
   - Cada teste valida um comportamento específico
   - Evite testes complexos com múltiplas validações

5. **Mock Mínimo**
   - Apenas mock o que é necessário
   - Mantenha mocks simples e claros

## 📝 Arquivos de Exemplo Criados

- ✅ `Nivel.entity.test.ts` - Teste de entidade
- ✅ `CreateNivel.usecase.test.ts` - Teste de use case
- ✅ `NivelRepository.test.ts` - Teste de repository

Use estes arquivos como referência para criar novos testes!

## 🚀 Próximos Passos

1. [ ] Criar testes para módulo Profissional
2. [ ] Adicionar testes E2E
3. [ ] Configurar CI/CD com testes
4. [ ] Atingir 80% de cobertura global
5. [ ] Documentar casos de teste complexos

---

**Com esta estrutura de testes, o código fica mais confiável e fácil de manter!** 🎉
