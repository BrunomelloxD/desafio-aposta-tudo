<template>
  <nav class="bg-dark-light border-b border-surface-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-3">
          <span
            class="flex shrink-0 rounded-full w-10 h-10 items-center justify-center bg-primary text-white font-bold text-sm"
          >
            AT
          </span>
          <span class="text-xl font-bold text-text">
            APOSTA<span class="text-primary">TUDO</span>
          </span>
        </NuxtLink>

        <div class="flex items-center space-x-1">
          <NavLink
            v-for="link in NAV_LINKS"
            :key="link.to"
            :to="link.to"
            :label="link.label"
            :icon="link.icon"
            :is-active="isActive(link.to)"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

interface NavItem {
  to: string
  label: string
  icon: Component
}

const NAV_LINKS: NavItem[] = [
  { to: '/', label: 'Inicio', icon: HomeIcon },
  { to: '/niveis', label: 'Niveis', icon: ChartBarIcon },
  { to: '/profissionais', label: 'Profissionais', icon: UsersIcon },
]

const route = useRoute()

const isActive = (path: string): boolean => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
