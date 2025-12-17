<!-- directory: app/components/organisms/NavBar.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isOpen = ref(false)
const activeSection = ref('top')

// Smooth scroll
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    isOpen.value = false
  }
}

// Track scroll depth for blur
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Observe section visibility
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
    {
      threshold: 0.4, // triggers when ~40% of section is visible
    }
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

const links = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Timeline', id: 'timeline' },
  { name: 'Contact', id: 'contact' },
]
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="isScrolled ? 'backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-[0_0_25px_rgba(116,34,108,0.4)]' : 'bg-transparent'"
  >
    <nav
      class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"
    >
      <!-- Logo / Name -->
      <button
        @click="scrollToSection('top')"
        class="cursor-pointer select-none font-semibold text-seasalt text-lg md:text-xl hover:text-lilac transition bg-transparent border-none p-0"
        aria-label="Scroll to top"
      >
        My <span class="text-lilac">Curriculum Vitae</span>
      </button>

      <!-- Desktop links -->
      <ul
        class="hidden md:flex items-center gap-6 text-sm text-seasalt/80 font-medium"
      >
        <li
          v-for="link in links"
          :key="link.id"
        >
          <button
            @click="scrollToSection(link.id)"
            class="cursor-pointer transition-all duration-200 bg-transparent border-none p-0"
            :class="activeSection === link.id
              ? 'text-lilac border-b border-lilac pb-[2px]'
              : 'hover:text-seasalt hover:scale-105'"
          >
            {{ link.name }}
          </button>
        </li>
      </ul>

      <!-- Mobile menu toggle -->
      <button
        class="md:hidden text-seasalt/80 hover:text-seasalt transition"
        @click="isOpen = !isOpen"
        aria-label="Toggle navigation menu"
      >
        <Icon
          :name="isOpen ? 'mdi:close' : 'mdi:menu'"
          class="size-6"
        />
      </button>
    </nav>

    <!-- Mobile dropdown -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="md:hidden flex flex-col items-center gap-4 py-4 bg-white/10 backdrop-blur-xl border-t border-white/10 text-seasalt/90 text-sm"
      >
          <button
            v-for="link in links"
            :key="link.id"
            @click="scrollToSection(link.id)"
            class="cursor-pointer hover:text-seasalt transition bg-transparent border-none p-0"
            :class="activeSection === link.id ? 'text-lilac font-semibold' : ''"
          >
            {{ link.name }}
          </button>
      </div>
    </transition>
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
