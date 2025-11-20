<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'

interface SkillCard {
  icon: string
  title: string
  description: string
  bullets: string[]
  ariaLabel: string
}

const skillCards: SkillCard[] = [
  {
    icon: 'mdi:laptop',
    title: 'Full-Stack Web Development',
    description:
      'I design and build complete user experiences - from landing pages and dashboards all the way to checkout flows and performance tuning.',
    bullets: [
      'Vue / Nuxt / Tailwind / Pinia',
      'Responsive UI, animation, component systems',
      'Auth, cart, checkout, real-world product flows',
    ],
    ariaLabel: 'Full-stack web development skills',
  },
  {
    icon: 'mdi:chart-line',
    title: 'Data & Analytics',
    description:
      'I use data to drive product decisions and reduce friction across support and sales funnels.',
    bullets: [
      'NLP on 100K+ chatbot interactions (+15% intent accuracy)',
      'Cut escalations about 10 percent with Tableau dashboards',
      'SQL / Python / Tableau',
    ],
    ariaLabel: 'Data and analytics skills',
  },
  {
    icon: 'mdi:rocket-launch-outline',
    title: 'Shipping & Impact',
    description:
      'I build solutions that solve real problems and increase conversion, not just "look nice in a Dribbble shot."',
    bullets: [
      'High-converting restaurant landing page for Al-Kheima',
      'Grover grocery app with cart and live availability',
      'E-commerce storefront with variants and checkout',
    ],
    ariaLabel: 'Shipping and product impact skills',
  },
  {
    icon: 'mdi:account-school-outline',
    title: 'Mentoring & Teaching',
    description:
      'I teach coding and problem-solving to early learners and new developers, focusing on clarity, confidence, and mindset.',
    bullets: [
      'Designed beginner-friendly web dev curriculum for teens',
      'Trained logic using PRIMM (Predict + Run + Investigate + Modify + Make)',
      'Helped students move from "copy code" to "I can build this"',
    ],
    ariaLabel: 'Mentoring and teaching skills',
  },
]

const isLargeScreen = ref(false)
const gridVisible = ref(false)
const cardVisible = ref<boolean[]>(Array(skillCards.length).fill(false))

const gridRef = ref<HTMLElement | null>(null)
const cardRefs = ref<(HTMLElement | null)[]>(Array(skillCards.length).fill(null))

let gridObserver: IntersectionObserver | null = null
let cardObserver: IntersectionObserver | null = null
let mediaQuery: MediaQueryList | null = null

const observerOptions: IntersectionObserverInit = {
  threshold: 0.25,
  rootMargin: '0px 0px -10% 0px',
}

const disconnectObservers = () => {
  if (gridObserver) {
    gridObserver.disconnect()
    gridObserver = null
  }

  if (cardObserver) {
    cardObserver.disconnect()
    cardObserver = null
  }
}

const registerCardRef = (el: HTMLElement | null, index: number) => {
  const previous = cardRefs.value[index]

  if (previous && cardObserver && !isLargeScreen.value) {
    cardObserver.unobserve(previous)
  }

  cardRefs.value[index] = el

  if (el && cardObserver && !isLargeScreen.value) {
    cardObserver.observe(el)
  }
}

const setupLargeScreenObserver = () => {
  if (!gridRef.value) return

  gridObserver = new IntersectionObserver(entries => {
    const entry = entries[0]
    if (!entry) return

    gridVisible.value = entry.isIntersecting
  }, observerOptions)

  gridObserver.observe(gridRef.value)
}

const setupCardObserver = () => {
  cardObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const indexAttr = entry.target.getAttribute('data-skill-index')
      if (indexAttr == null) continue

      const index = Number.parseInt(indexAttr, 10)
      if (Number.isNaN(index)) continue

      cardVisible.value[index] = entry.isIntersecting
    }
  }, observerOptions)

  cardRefs.value.forEach(el => {
    if (el) {
      cardObserver?.observe(el)
    }
  })
}

const setupObservers = () => {
  nextTick(() => {
    disconnectObservers()
    gridVisible.value = false
    cardVisible.value = Array(skillCards.length).fill(false)

    if (isLargeScreen.value) {
      setupLargeScreenObserver()
    } else {
      setupCardObserver()
    }
  })
}

const handleMediaChange = (event: MediaQueryListEvent) => {
  isLargeScreen.value = event.matches
}

watch(isLargeScreen, () => {
  setupObservers()
})

onMounted(() => {
  if (typeof window === 'undefined') return

  mediaQuery = window.matchMedia('(min-width: 1024px)')
  isLargeScreen.value = mediaQuery.matches

  if ('addEventListener' in mediaQuery) {
    mediaQuery.addEventListener('change', handleMediaChange)
  } else {
    // eslint-disable-next-line deprecation/deprecation
    mediaQuery.addListener(handleMediaChange)
  }

  setupObservers()
})

onBeforeUnmount(() => {
  disconnectObservers()

  if (!mediaQuery) return

  if ('removeEventListener' in mediaQuery) {
    mediaQuery.removeEventListener('change', handleMediaChange)
  } else {
    // eslint-disable-next-line deprecation/deprecation
    mediaQuery.removeListener(handleMediaChange)
  }
})
</script>

<template>
  <section
    id="skills"
    class="py-20 lg:py-28 scroll-mt-24"
    aria-label="Skills and technology stack"
  >
    <SectionHeader title="Skills & Stack" :center="true" />

    <ul
      ref="gridRef"
      role="list"
      aria-label="Skill categories"
      class="max-w-6xl mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4
             transition-all duration-500 ease-out will-change-transform transform opacity-100 translate-y-0"
      :class="isLargeScreen
        ? (gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
        : ''"
    >
      <li
        v-for="(card, index) in skillCards"
        :key="card.title"
        :data-skill-index="index"
        :aria-label="card.ariaLabel"
        role="listitem"
        :ref="el => registerCardRef(el as HTMLElement | null, index)"
        class="rounded-[var(--radius-2xl)]
               bg-white/5 backdrop-blur-xl border border-white/10
               shadow-[var(--shadow-glow-purple)]
               p-6 md:p-7
               transition-all duration-500 ease-out transform-gpu
               hover:scale-[1.03] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]
               text-seasalt flex flex-col opacity-100 translate-y-0"
        :class="isLargeScreen
          ? ''
          : (cardVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')"
      >
        <div
          class="inline-flex items-center justify-center
                 size-10 rounded-xl
                 bg-byzantium/30 border border-byzantium/60
                 text-seasalt shadow-[0_0_20px_rgba(116,34,108,0.8)]
                 mb-4"
          aria-hidden="true"
        >
          <Icon :name="card.icon" class="size-5 text-seasalt" />
        </div>

        <h3 class="text-seasalt font-semibold text-lg leading-snug">
          {{ card.title }}
        </h3>

        <p class="text-seasalt/70 text-sm leading-relaxed mt-3">
          {{ card.description }}
        </p>

        <ul class="mt-4 space-y-2 text-[0.8rem] leading-relaxed text-seasalt/70">
          <li
            v-for="(bullet, bulletIndex) in card.bullets"
            :key="bulletIndex"
            class="flex items-start gap-2"
          >
            <div
              class="mt-[0.4rem] size-1.5 rounded-full bg-byzantium shadow-[0_0_10px_rgba(116,34,108,0.9)]"
              aria-hidden="true"
            />
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<style scoped>
/* no extra styles needed: icons use @nuxt/icon and inherit theme */
</style>
