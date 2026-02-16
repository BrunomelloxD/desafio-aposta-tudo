<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="text-center py-16">
      <h1 class="text-4xl font-bold text-text mb-4">
        Sistema de Gestão <span class="text-primary">APOSTATUDO</span>
      </h1>
      <p class="text-lg text-text-muted mb-12">
        Gerencie níveis e profissionais de forma simples e eficiente
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <NuxtLink
          v-for="card in CARDS"
          :key="card.to"
          :to="card.to"
          class="block p-8 bg-dark-light rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-surface-border hover:border-primary group"
        >
          <div class="flex items-center gap-4 mb-3">
            <div class="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <component :is="card.icon" class="h-6 w-6" />
            </div>
            <h2 class="text-2xl font-semibold text-text group-hover:text-primary transition-colors">
              {{ card.title }}
            </h2>
          </div>
          <p class="text-text-muted">{{ card.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChartBarIcon, UsersIcon } from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

interface CardItem {
  to: string
  title: string
  description: string
  icon: Component
}

const CARDS: CardItem[] = [
  {
    to: '/niveis',
    title: 'Níveis',
    description: 'Gerencie os níveis profissionais do sistema',
    icon: ChartBarIcon,
  },
  {
    to: '/profissionais',
    title: 'Profissionais',
    description: 'Gerencie os profissionais cadastrados',
    icon: UsersIcon,
  },
]
</script>
