<!-- directory: app/components/organisms/ProjectsSection.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'

interface Project {
  name: string
  desc: string
  img: string
  stack: string[]
  github: string
}

// IMPORTANT:
// Make sure these files exist in /public/projects/ :
//
// public/projects/grover-img.jpg
// public/projects/kheima-img.png
// public/projects/suitsupply-img.png
// public/projects/project-nlp-placeholder.png
//
// You can test in browser: http://localhost:3000/projects/grover-img.jpg

const projects = ref<Project[]>([
  {
    name: 'Grover Grocery App',
    desc: 'Online grocery shopping experience with cart, auth, and real-time live availability.',
    img: '/projects/grover-img.jpg',
    stack: ['HTML', 'CSS Animations', 'Vanilla JS', 'SVG', 'Bootstrap'],
    github: 'https://github.com/Shaf3y01/Grover',
  },
  {
    name: 'SIXTEEN CLOTHING STORE',
    desc: 'Fully responsive storefront for teens and adults. Spiced with animations, transitions. Implemented with auth, cart, and checkout.',
    img: '/projects/sixteen-cs-img.png',
    stack: ['Vanilla JS', 'Owl Carousel','jQuery', 'HTML5', 'CSS Animations & Media Query'],
    github: 'https://github.com/Shaf3y01/Clothing-Store',
  },
  {
    name: 'Al-Kheima Restaurant',
    desc: 'High-conversion restaurant landing page and a form focused on testing Flexbox and responsive Media Queries',
    img: '/projects/kheima-img.png',
    stack: ['Vanilla JS', 'CSS Flexbox', 'HTML5'],
    github: 'https://github.com/Shaf3y01/Al-Kheima',
  },
  {
    name: 'SuitSupply Store',
    desc: 'E-commerce storefront for suits apparel with filtering, variants, and checkout.',
    img: '/projects/suitsupply-img.png',
    stack: ['HTML5', 'CSS & Media Queries', 'Vanilla JS'],
    github: 'https://github.com/Shaf3y01/SuitSupply',
  },
  {
    name: 'M Power Gym',
    desc: 'Innovative Gym landing page, using CSS Animations and Vanilla JS for smooth UI/UX.',
    img: 'projects/mpower-img.png',
    stack: ['HTML5', 'CSS Animations', 'Media Query', 'Vanilla JS'],
    github: 'https://github.com/Shaf3y01/MPowerGym',
  }, {
    name: 'Company Sales Analysis',
    desc: 'Cleaned/Transformed/Analyzed Company Data for Sales Insights and for better future Marketing Strategies.',
    img: '/projects/power-bi-project-1.png',
    stack: ['Python', 'Power BI', 'Statistics'],
    github: 'https://github.com/Sha3fy01',
  },
  {
    name: 'NLP Support Insights',
    desc: 'Analyzed 100K+ chatbot messages with NLP to boost intent accuracy by 15% and cut escalations 10%.',
    img: 'https://placehold.co/600x400/FFFFFF/C8A2C8/png?text=DA',
    stack: ['Python', 'NLP', 'Tableau', 'SQL'],
    github: 'https://github.com/your-github/nlp-analytics',
  }
] as const)

const current = ref<number>(0)
const direction = ref<'next' | 'prev'>('next')

// give the current card a unique key so <Transition> knows when to animate
const cardKey = computed<string>(() => {
  const p = projects.value[current.value]!
  return `${current.value}-${p.name}`
})

// active (front) project
const activeProject = computed<Project>(() => {
  return projects.value[current.value]!
})

// next preview (the blurred stacked card behind)
const nextPreview = computed<Project>(() => {
  const idx = (current.value + 1) % projects.value.length
  return projects.value[idx]!
})

const projectCount = computed<number>(() => projects.value.length)

function nextProject() {
  direction.value = 'next'
  current.value = (current.value + 1) % projects.value.length
}

function prevProject() {
  direction.value = 'prev'
  current.value =
    (current.value - 1 + projects.value.length) % projects.value.length
}
</script>

<template>
  <section id="projects" class="projects-section py-20 lg:py-28 scroll-mt-24"
    aria-label="Featured project case studies">
    <SectionHeader title="Featured Work" :center="true" />

    <div class="relative flex flex-col items-center">
      <!-- background / stacked preview card (subtle depth) -->
      <div class="projects-preview-card pointer-events-none absolute top-6 scale-95 opacity-30 blur-[2px]
               rounded-[var(--radius-2xl)]
               bg-white/5 backdrop-blur-xl border
               shadow-[var(--shadow-glow-purple)]
               w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
               transition-all duration-300" aria-hidden="true">
        <div class="aspect-video w-full border-b border-white/10 bg-eerie/60 overflow-hidden" role="presentation">
          <img :src="nextPreview.img" alt="" class="w-full h-full object-cover object-center opacity-70"
            aria-hidden="true" />
        </div>
        <div class="p-6 text-seasalt/40 text-sm leading-relaxed">
          <div class="font-semibold text-seasalt/60 text-base mb-1">
            {{ nextPreview.name }}
          </div>
          <div class="line-clamp-2">
            {{ nextPreview.desc }}
          </div>
        </div>
      </div>

      <!-- ACTIVE CARD WITH ANIMATION -->
      <Transition :name="direction === 'next' ? 'swipe-next' : 'swipe-prev'" mode="out-in">
        <a :key="cardKey" class="projects-card group relative z-10 rounded-[var(--radius-2xl)]
                 bg-white/5 backdrop-blur-xl border border-[#4b4f4d]
                 shadow-[var(--shadow-glow-purple)]
                 transition-all duration-300
                 hover:scale-[1.03] hover:border-[#b69ebf] hover:shadow-[0_0_60px_rgba(182,158,191,0.9)]
                 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
                 flex flex-col overflow-hidden" :href="activeProject.github" target="_blank" rel="noopener noreferrer"
          :aria-label="`View ${activeProject.name} project on GitHub (opens in a new tab)`">
          <!-- project image / preview -->
          <div class="relative w-full aspect-video bg-eerie/60 border-b border-white/10 overflow-hidden">
            <img :src="activeProject.img" :alt="`${activeProject.name} project preview`"
              class="w-full h-full object-cover object-center opacity-80 transition-opacity duration-300" />

            <!-- purple glow overlay -->
            <div class="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300" style="
                background: radial-gradient(
                  circle at 30% 30%,
                  rgba(116, 34, 108, 0.5) 0%,
                  rgba(34, 40, 35, 0) 70%
                );
                filter: drop-shadow(0 0 30px rgba(116, 34, 108, 0.8));
              " aria-hidden="true"></div>
          </div>

          <!-- text content -->
          <div class="projects-card-body p-6 flex flex-col flex-1 text-center md:text-left
                   min-h-[16rem] md:min-h-[14rem] lg:min-h-[13rem]" aria-live="polite">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 class="text-seasalt text-lg font-semibold leading-snug">
                {{ activeProject.name }}
              </h3>

              <!-- "View Code" mini CTA --> 
              <div
                class="projects-view-code flex items-center justify-center md:justify-end text-[0.8rem] text-seasalt/60 transition-colors duration-300">
                <Icon name="mdi:github" class="size-4 mr-2 opacity-80 transition-opacity duration-300"
                  aria-hidden="true" />
                <span class="text-seasalt/70">View Code</span>
              </div>
            </div>

            <p class="projects-card-desc text-seasalt/70 text-sm leading-relaxed mt-3 md:mt-4 line-clamp-3">
              {{ activeProject.desc }}
            </p>

            <!-- tech stack chips -->
            <ul class="projects-stack flex flex-wrap justify-center md:justify-start gap-2 mt-6 pt-1 pb-1
                     max-h-[4.5rem] overflow-hidden" :aria-label="`${activeProject.name} technology stack`">
              <li v-for="tech in activeProject.stack" :key="tech" class="projects-chip font-mono text-[0.7rem] leading-none px-2.5 py-1 rounded-full border
                       shadow-[0_0_18px_rgba(182,158,191,0.55)]
                       transition-all duration-300">
                {{ tech }}
              </li>
            </ul>
          </div>
        </a>
      </Transition>

      <!-- Controls -->
      <div class="mt-8 flex items-center gap-4 text-seasalt/60">
        <button class="projects-control flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xl)]
                 border backdrop-blur-xl text-sm
                 transition-all duration-300 hover:scale-[1.01] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]"" type="button" @click.stop.prevent="prevProject"
          aria-label="Show previous project">
          <Icon name="mdi:chevron-left" class="size-5" aria-hidden="true" />
          <span class="hidden sm:inline-block">Prev</span>
        </button>

        <button class="projects-control flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xl)]
                 border backdrop-blur-xl text-sm
                 transition-all duration-200" type="button" @click.stop.prevent="nextProject"
          aria-label="Show next project">
          <span class="hidden sm:inline-block">Next</span>
          <Icon name="mdi:chevron-right" class="size-5" aria-hidden="true" />
        </button>
      </div>

      <!-- index / counter -->
      <div class="projects-counter mt-4 text-[0.75rem] text-seasalt/40 tracking-wide uppercase" aria-live="polite">
        {{ current + 1 }} / {{ projectCount }}
      </div>
    </div>
  </section>
</template>

<style scoped>
:root {
  --color-eerie: #222823;
  --color-seasalt: #f4f7f5;
  --color-lilac: #b69ebf;
  --color-byzantium: #74226c;

  --projects-border: rgba(244, 247, 245, 0.08);
  --projects-preview-bg: rgba(26, 27, 28, 0.78);
  --projects-preview-border: rgba(94, 99, 97, 0.65);
  --projects-preview-shadow: 0 0 40px rgba(116, 34, 108, 0.45);
  --projects-preview-text: rgba(244, 247, 245, 0.6);

  --projects-card-bg: rgba(24, 26, 25, 0.82);
  --projects-card-border: rgba(78, 79, 79, 0.85);
  --projects-card-shadow: 0 0 45px rgba(116, 34, 108, 0.5);
  --projects-card-border-hover: rgba(182, 158, 191, 0.95);
  --projects-card-shadow-hover: 0 0 70px rgba(182, 158, 191, 0.85);
  --projects-card-text: rgba(244, 247, 245, 0.94);
  --projects-card-muted: rgba(244, 247, 245, 0.75);
  --projects-card-heading: var(--color-seasalt);

  --projects-chip-bg: #b69ebf;
  --projects-chip-border: rgba(244, 247, 245, 0.6);
  --projects-chip-text: rgba(31, 36, 33, 0.95);
  --projects-chip-hover-bg: #74226c;
  --projects-chip-hover-border: rgba(244, 247, 245, 0.85);
  --projects-chip-hover-text: var(--color-seasalt);

  --projects-control-bg: rgba(182, 158, 191, 0.5);
  --projects-control-border: rgba(182, 158, 191, 0.8);
  --projects-control-text: rgba(34, 40, 35, 0.9);
  --projects-control-hover-bg: rgba(116, 34, 108, 0.6);
  --projects-control-hover-text: var(--color-seasalt);
  --projects-control-hover-border: rgba(116, 34, 108, 0.85);
  --projects-control-hover-shadow: 0 0 28px rgba(116, 34, 108, 0.75);

  --projects-counter-text: rgba(244, 247, 245, 0.46);
  --projects-view-code-text: rgba(244, 247, 245, 0.7);
  --projects-view-code-hover: rgba(244, 247, 245, 0.96);
}

[data-theme='day'] {
  --projects-border: rgba(34, 40, 35, 0.12);
  --projects-preview-bg: rgba(244, 247, 245, 0.96);
  --projects-preview-border: rgba(116, 34, 108, 0.25);
  --projects-preview-shadow: 0 0 35px rgba(116, 34, 108, 0.4);
  --projects-preview-text: rgba(34, 40, 35, 0.62);

  --projects-card-bg: rgba(244, 247, 245, 0.97);
  --projects-card-border: rgba(116, 34, 108, 0.35);
  --projects-card-shadow: 0 0 45px rgba(182, 158, 191, 0.35);
  --projects-card-border-hover: rgba(116, 34, 108, 0.7);
  --projects-card-shadow-hover: 0 0 60px rgba(116, 34, 108, 0.55);
  --projects-card-text: rgba(34, 40, 35, 0.92);
  --projects-card-muted: rgba(34, 40, 35, 0.74);
  --projects-card-heading: var(--color-byzantium);

  --projects-chip-bg: #b69ebf;
  --projects-chip-border: rgba(116, 34, 108, 0.55);
  --projects-chip-text: rgba(34, 40, 35, 0.88);
  --projects-chip-hover-bg: rgba(116, 34, 108, 0.48);
  --projects-chip-hover-border: rgba(116, 34, 108, 0.68);
  --projects-chip-hover-text: rgba(244, 247, 245, 1);

  --projects-control-bg: rgba(182, 158, 191, 0.52);
  --projects-control-border: rgba(116, 34, 108, 0.55);
  --projects-control-text: rgba(34, 40, 35, 0.85);
  --projects-control-hover-bg: rgba(116, 34, 108, 0.5);
  --projects-control-hover-text: rgba(244, 247, 245, 0.98);
  --projects-control-hover-border: rgba(116, 34, 108, 0.78);
  --projects-control-hover-shadow: 0 0 24px rgba(116, 34, 108, 0.45);

  --projects-counter-text: rgba(34, 40, 35, 0.5);
  --projects-view-code-text: rgba(116, 34, 108, 0.7);
  --projects-view-code-hover: rgba(116, 34, 108, 0.95);
}

.projects-section {
  border-color: var(--projects-border);
}

.projects-preview-card {
  background-color: var(--projects-preview-bg);
  border-color: var(--projects-preview-border);
  box-shadow: var(--projects-preview-shadow);
  color: var(--projects-preview-text);
  backdrop-filter: blur(18px);
}

.projects-card {
  background-color: var(--projects-card-bg);
  border-color: var(--color-byzantium);
  box-shadow: var(--shadow-glow-purple), var(--projects-card-shadow);
  color: var(--projects-card-text);
  backdrop-filter: blur(18px);
}

.projects-card:hover,
.projects-card:focus-within {
  border-color: var(--color-lilac);
  box-shadow: var(--shadow-glow-purple), var(--projects-card-shadow-hover);
}

.projects-card-body {
  color: var(--projects-card-text);
}

.projects-card-body h3 {
  color: var(--projects-card-heading);
}

.projects-card-desc {
  color: var(--projects-card-muted);
}

.projects-view-code span {
  color: var(--projects-view-code-text);
  transition: color 200ms ease;
}

.projects-card:hover .projects-view-code span,
.projects-card:focus-within .projects-view-code span {
  color: var(--projects-view-code-hover);
}

.projects-stack {
  color: inherit;
}

.projects-chip {
  background-color: var(--projects-chip-bg);
  border-color: var(--color-byzantium);
  color: var(--projects-chip-text);
  box-shadow: 0 0 20px rgba(116, 34, 108, 0.35);
  transition: background-color 200ms ease, color 200ms ease-in-out  , border-color 200ms ease-in-out  , box-shadow 200ms ease-in-out  ;
}

.projects-card:hover .projects-chip,
.projects-card:focus-within .projects-chip {
  background-color: var(--projects-chip-hover-bg);
  border-color: var(--color-lilac);
  color: var(--projects-chip-hover-text);
  box-shadow: 0 0 28px rgba(116, 34, 108, 0.6);
}

.projects-control {
  background-color: var(--projects-control-bg);
  border-color: var(--projects-control-border);
  color: var(--projects-control-text);
  box-shadow: 0 0 12px rgba(116, 34, 108, 0.28);
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.projects-control:hover,
.projects-control:focus-visible {
  background-color: var(--projects-control-hover-bg);
  color: var(--projects-control-hover-text);
  border-color: var(--color-byzantium);
  box-shadow: var(--projects-control-hover-shadow);
  transition: ease-in-out 300ms;
  scale: 1.02;
}

.projects-counter {
  color: var(--projects-counter-text);
}

/* swipe-next (user clicked Next)
   - current card ENTERS from the right and settles centered
   - old card LEAVES to the left with slight rotate and fade
*/
.swipe-next-enter-from {
  opacity: 0;
  transform: translateX(60px) rotate(4deg) scale(0.96);
}

.swipe-next-enter-active {
  transition: all 250ms ease;
}

.swipe-next-leave-to {
  opacity: 0;
  transform: translateX(-60px) rotate(-6deg) scale(0.9);
}

.swipe-next-leave-active {
  transition: all 250ms ease;
}

/* swipe-prev (user clicked Prev)
   - current card ENTERS from the left
   - old card LEAVES to the right
*/
.swipe-prev-enter-from {
  opacity: 0;
  transform: translateX(-60px) rotate(-4deg) scale(0.96);
}

.swipe-prev-enter-active {
  transition: all 250ms ease;
}

.swipe-prev-leave-to {
  opacity: 0;
  transform: translateX(60px) rotate(6deg) scale(0.9);
}

.swipe-prev-leave-active {
  transition: all 250ms ease;
}
</style>
