<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Sistema de Gestão</h1>
      <p class="text-lg text-gray-600 mb-8">
        Gerencie níveis e profissionais de forma simples e eficiente
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
        <NuxtLink to="/niveis" 
          class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-900 mb-2">Níveis</h2>
          <p class="text-gray-600">Gerencie os níveis profissionais</p>
        </NuxtLink>

        <NuxtLink to="/profissionais" 
          class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-900 mb-2">Profissionais</h2>
          <p class="text-gray-600">Gerencie os profissionais cadastrados</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
