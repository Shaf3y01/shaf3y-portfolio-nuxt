<!-- directory: app/layouts/default.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useClickParticles } from '@/composables/useClickParticles'

const { enable, disable } = useClickParticles()

onMounted(() => {
  enable()
})

onBeforeUnmount(() => {
  disable()
})
</script>

<template>
  <div
    class="min-h-screen bg-eerie text-seasalt antialiased relative overflow-hidden"
  >
    <!-- global purple glow in background -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(116,34,108,0.35)_0%,rgba(34,40,35,0)_70%)] blur-3xl opacity-60"
    ></div>

    <!-- page content container -->
    <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <slot />
    </main>
  </div>
</template>
