<!-- directory: app/layouts/default.vue -->
<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useClickParticles } from '@/composables/useClickParticles'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'

const { enable, disable } = useClickParticles()
const { theme, initTheme } = useTheme()
const { lang, initLang } = useLocale()

useHead({
  htmlAttrs: computed(() => ({
    'data-theme': theme.value,
    dir: lang.value === 'ar' ? 'rtl' : 'ltr',
    lang: lang.value,
  })),
})

onMounted(() => {
  initTheme()
  initLang()
  enable()
})

onBeforeUnmount(() => {
  disable()
})
</script>

<template>
  <div
    :class="theme === 'day' ? 'bg-seasalt text-eerie' : 'bg-eerie text-seasalt'"
    class="min-h-screen antialiased relative overflow-hidden transition-colors duration-300"
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
