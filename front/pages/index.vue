<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold text-white mb-4">
        Sistema de Gestão <span class="text-accent">APOSTATUDO</span>
      </h1>
      <p class="text-lg text-gray-300 mb-8">
        Gerencie níveis e profissionais de forma simples e eficiente
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
        <NuxtLink to="/niveis" 
          class="block p-8 bg-dark-light rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/30 hover:border-primary group">
          <div class="text-5xl mb-4">📊</div>
          <h2 class="text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">Níveis</h2>
          <p class="text-gray-400">Gerencie os níveis profissionais do sistema</p>
        </NuxtLink>

        <NuxtLink to="/profissionais" 
          class="block p-8 bg-dark-light rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-accent/30 hover:border-accent group">
          <div class="text-5xl mb-4">👥</div>
          <h2 class="text-2xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">Profissionais</h2>
          <p class="text-gray-400">Gerencie os profissionais cadastrados</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
