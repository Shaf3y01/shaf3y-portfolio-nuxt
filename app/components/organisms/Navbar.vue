<!-- directory: app/components/organisms/NavBar.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import en from '@/locales/en'
import ar from '@/locales/ar'

const { theme, toggle: toggleTheme } = useTheme()
const { lang, toggle: toggleLang } = useLocale()

const locale = computed(() => (lang.value === 'ar' ? ar : en))

const isScrolled = ref(false)
const isOpen = ref(false)
const activeSection = ref('top')

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    isOpen.value = false
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const sections = ['about', 'projects', 'skills', 'timeline', 'contact']

function createObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.4 }
  )
  sections.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  createObserver()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="isScrolled
      ? (theme === 'day'
          ? 'backdrop-blur-xl bg-black/5 border-b border-black/10 shadow-[0_0_25px_rgba(116,34,108,0.3)]'
          : 'backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-[0_0_25px_rgba(116,34,108,0.4)]')
      : 'bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo / Name -->
      <button
        @click="scrollToSection('top')"
        class="cursor-pointer select-none font-semibold text-lg md:text-xl hover:text-lilac transition bg-transparent border-none p-0"
        :class="theme === 'day' ? 'text-eerie' : 'text-seasalt'"
        aria-label="Scroll to top"
      >
        {{ locale.nav.brand.split(' ').slice(0, -1).join(' ') }}
        <span class="text-lilac">{{ ' ' + locale.nav.brand.split(' ').slice(-1)[0] }}</span>
      </button>

      <!-- Desktop links -->
      <ul
        class="hidden md:flex items-center gap-6 text-sm font-medium"
        :class="theme === 'day' ? 'text-eerie/80' : 'text-seasalt/80'"
      >
        <li v-for="link in locale.nav.links" :key="link.id">
          <button
            @click="scrollToSection(link.id)"
            class="cursor-pointer transition-all duration-200 bg-transparent border-none p-0"
            :class="activeSection === link.id
              ? 'text-lilac border-b border-lilac pb-[2px]'
              : (theme === 'day' ? 'hover:text-eerie hover:scale-105' : 'hover:text-seasalt hover:scale-105')"
          >
            {{ link.name }}
          </button>
        </li>
      </ul>

      <!-- Right-side controls: theme + lang toggles + hamburger -->
      <div class="flex items-center gap-1">
        <!-- Theme toggle -->
        <button
          @click="toggleTheme"
          class="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
          :class="theme === 'day' ? 'text-eerie/70 hover:text-byzantium' : 'text-seasalt/70 hover:text-lilac'"
          :aria-label="theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'"
        >
          <Icon
            :name="theme === 'night' ? 'mdi:weather-sunny' : 'mdi:weather-night'"
            class="size-5"
          />
        </button>

        <!-- Language toggle -->
        <button
          @click="toggleLang"
          class="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 font-bold text-sm w-8 text-center"
          :class="theme === 'day' ? 'text-eerie/70 hover:text-byzantium' : 'text-seasalt/70 hover:text-lilac'"
          aria-label="Toggle language / تبديل اللغة"
        >
          {{ lang === 'en' ? 'ع' : 'EN' }}
        </button>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden transition p-1.5"
          :class="theme === 'day' ? 'text-eerie/80 hover:text-eerie' : 'text-seasalt/80 hover:text-seasalt'"
          @click="isOpen = !isOpen"
          aria-label="Toggle navigation menu"
        >
          <Icon :name="isOpen ? 'mdi:close' : 'mdi:menu'" class="size-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile dropdown -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="md:hidden flex flex-col items-center gap-4 py-4 border-t text-sm"
        :class="theme === 'day'
          ? 'bg-black/5 backdrop-blur-xl border-black/10 text-eerie/90'
          : 'bg-white/10 backdrop-blur-xl border-white/10 text-seasalt/90'"
      >
        <button
          v-for="link in locale.nav.links"
          :key="link.id"
          @click="scrollToSection(link.id)"
          class="cursor-pointer transition bg-transparent border-none p-0"
          :class="activeSection === link.id ? 'text-lilac font-semibold' : ''"
        >
          {{ link.name }}
        </button>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
