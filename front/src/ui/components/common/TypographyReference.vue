<!--
  Typography Component - Guia de Referência
  
  Este arquivo demonstra o uso correto das weights da fonte Plus Jakarta Sans
  no projeto. Use como referência ao criar novos componentes.
  
  Tech Lead Note: Este arquivo serve como documentação viva e styleguide.
-->

<template>
  <div class="p-8 space-y-8 bg-dark">
    <section class="space-y-6">
      <h1 class="text-4xl font-extrabold text-white">
        Typography System
      </h1>
      <p class="text-gray-400">
        Plus Jakarta Sans - Guia de uso das diferentes weights
      </p>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Headings</h2>
      
      <div class="space-y-2 bg-dark-light p-6 rounded-lg border border-dark-lighter">
        <h1 class="text-4xl font-bold text-white">
          Heading 1 - Bold (700)
        </h1>
        <h2 class="text-3xl font-semibold text-white">
          Heading 2 - Semibold (600)
        </h2>
        <h3 class="text-2xl font-semibold text-white">
          Heading 3 - Semibold (600)
        </h3>
        <h4 class="text-xl font-medium text-white">
          Heading 4 - Medium (500)
        </h4>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Body Text</h2>
      
      <div class="space-y-4 bg-dark-light p-6 rounded-lg border border-dark-lighter">
        <p class="text-base font-normal text-gray-300">
          Regular (400) - Texto de corpo padrão. Use para conteúdo principal, descrições e parágrafos longos.
        </p>
        <p class="text-base font-medium text-gray-300">
          Medium (500) - Texto com ênfase moderada. Use para labels de formulário, subtítulos e navegação.
        </p>
        <p class="text-sm font-light text-gray-400">
          Light (300) - Texto secundário. Use para hints, descrições auxiliares e metadados.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Buttons & CTAs</h2>
      
      <div class="flex flex-wrap gap-4 bg-dark-light p-6 rounded-lg border border-dark-lighter">
        <button class="px-6 py-3 bg-primary text-white rounded-md font-semibold">
          Primary Button - Semibold (600)
        </button>
        <button class="px-6 py-3 bg-accent text-white rounded-md font-bold">
          Action Button - Bold (700)
        </button>
        <button class="px-6 py-3 bg-dark-lighter text-gray-300 rounded-md font-medium">
          Secondary Button - Medium (500)
        </button>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Tables & Data</h2>
      
      <div class="bg-dark-light rounded-lg border border-dark-lighter overflow-hidden">
        <table class="w-full">
          <thead class="bg-dark-lighter">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Header - Medium (500) Uppercase
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-6 py-4 text-sm font-medium text-white">
                Cell - Medium (500)
              </td>
              <td class="px-6 py-4 text-sm font-normal text-gray-400">
                Regular (400)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Forms</h2>
      
      <div class="space-y-4 bg-dark-light p-6 rounded-lg border border-dark-lighter max-w-md">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Label - Medium (500)
          </label>
          <input
            type="text"
            placeholder="Placeholder - Regular (400)"
            class="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-md text-white font-normal"
          />
          <p class="mt-1 text-xs font-light text-gray-500">
            Helper text - Light (300)
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Numbers & Statistics</h2>
      
      <div class="flex gap-6 bg-dark-light p-6 rounded-lg border border-dark-lighter">
        <div>
          <p class="text-4xl font-extrabold text-primary">
            1,234
          </p>
          <p class="text-sm font-medium text-gray-400">
            Extrabold (800)
          </p>
        </div>
        <div>
          <p class="text-4xl font-bold text-accent">
            567
          </p>
          <p class="text-sm font-medium text-gray-400">
            Bold (700)
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Usage Guide</h2>
      
      <div class="bg-dark-light p-6 rounded-lg border border-dark-lighter space-y-4">
        <div class="flex items-start gap-3">
          <span class="text-lg font-extrabold text-primary">800</span>
          <div>
            <p class="font-semibold text-white">Extrabold</p>
            <p class="text-sm text-gray-400">Números grandes, estatísticas principais</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <span class="text-lg font-bold text-primary">700</span>
          <div>
            <p class="font-semibold text-white">Bold</p>
            <p class="text-sm text-gray-400">Títulos H1-H2, botões de ação</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <span class="text-lg font-semibold text-primary">600</span>
          <div>
            <p class="font-semibold text-white">Semibold</p>
            <p class="text-sm text-gray-400">Subtítulos H3-H4, botões primários, ênfases</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <span class="text-lg font-medium text-primary">500</span>
          <div>
            <p class="font-semibold text-white">Medium</p>
            <p class="text-sm text-gray-400">Labels, navegação, headers de tabela</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <span class="text-lg font-normal text-primary">400</span>
          <div>
            <p class="font-semibold text-white">Regular</p>
            <p class="text-sm text-gray-400">Corpo de texto, inputs, conteúdo geral</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <span class="text-lg font-light text-primary">300</span>
          <div>
            <p class="font-semibold text-white">Light</p>
            <p class="text-sm text-gray-400">Textos secundários, hints, metadados</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Typography Reference Component
 * 
 * Este componente não é usado em produção - serve apenas como
 * referência visual para desenvolvedores.
 * 
 * Para visualizar:
 * 1. Crie uma rota temporária: pages/typography.vue
 * 2. Importe este componente
 * 3. Acesse /typography no navegador
 * 
 * @tech-lead Use este componente como styleguide ao criar novos layouts
 */
</script>

<style scoped>
/**
 * Neste projeto, evitamos CSS customizado.
 * Todas as estilizações são feitas via Tailwind.
 * 
 * A fonte Plus Jakarta Sans é aplicada automaticamente
 * via configuração do Tailwind (fontFamily.sans).
 */
</style>
