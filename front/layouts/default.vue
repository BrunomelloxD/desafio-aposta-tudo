<template>
  <div class="min-h-screen bg-dark">
    <!-- Top Navigation Bar -->
    <nav class="bg-primary border-b border-primary-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <NuxtLink to="/"
              class="flex shrink-0 rounded-full w-10 h-10 sm:w-12 sm:h-12 items-center justify-center relative p-[2px] !hover:opacity-100 !hover:scale-100 !hover:shadow-none"
              :style="`background: linear-gradient(to bottom, ${LOGO_GRADIENT.FROM}, ${LOGO_GRADIENT.VIA_1}, ${LOGO_GRADIENT.VIA_2}, ${LOGO_GRADIENT.TO})`">
              <span class="flex rounded-full w-full h-full items-center justify-center"
                :style="`background-color: ${LOGO_GRADIENT.BACKGROUND}`">
                <img src="/icons/logo.svg" alt="APOSTATUDO Logo" class="w-full h-full" />
              </span>
            </NuxtLink>
            <span class="text-2xl font-bold text-white">
              APOSTA<span class="text-accent">TUDO</span>
            </span>
          </div>

          <!-- Navigation Links -->
          <div class="flex space-x-1">
            <NuxtLink to="/" class="px-6 py-2 text-sm font-medium rounded-md transition-all duration-200" :class="$route.path === '/'
              ? 'text-white'
              : 'text-gray-300 hover:bg-primary-dark hover:text-white'"
              :style="$route.path === '/' ? 'background-color: #ff4c1e' : ''">
              Início
            </NuxtLink>
            <NuxtLink to="/niveis" class="px-6 py-2 text-sm font-medium rounded-md transition-all duration-200" :class="$route.path.startsWith('/niveis')
              ? 'text-white'
              : 'text-gray-300 hover:bg-primary-dark hover:text-white'"
              :style="$route.path.startsWith('/niveis') ? 'background-color: #ff4c1e' : ''">
              Níveis
            </NuxtLink>
            <NuxtLink to="/profissionais" class="px-6 py-2 text-sm font-medium rounded-md transition-all duration-200"
              :class="$route.path.startsWith('/profissionais')
                ? 'text-white'
                : 'text-gray-300 hover:bg-primary-dark hover:text-white'"
              :style="$route.path.startsWith('/profissionais') ? 'background-color: #ff4c1e' : ''">
              Profissionais
            </NuxtLink>
          </div>

        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { LOGO_GRADIENT } from '~/utils/constants'
</script>
