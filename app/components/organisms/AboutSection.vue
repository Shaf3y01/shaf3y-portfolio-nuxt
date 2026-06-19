<!-- directory: app/components/organisms/AboutSection.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'
import { useLocale } from '@/composables/useLocale'
import en from '@/locales/en'
import ar from '@/locales/ar'

const { lang } = useLocale()
const locale = computed(() => (lang.value === 'ar' ? ar : en))

const email = 'shaf3y.hired@gmail.com'
</script>

<template>
  <section
    class="py-20 lg:py-28"
    aria-label="About Mahmoud El-Shafey section"
  >
    <SectionHeader :title="locale.about.header" :center="false" />

    <div class="grid gap-10 lg:grid-cols-[2fr,1fr] lg:gap-16">
      <!-- LEFT: Bio -->
      <div class="bio-text text-seasalt/60 text-base md:text-lg leading-relaxed space-y-5">
        <p
          v-for="paragraph in locale.about.bio"
          :key="paragraph"
          v-html="paragraph"
        />

        <div class="pt-4 flex flex-col sm:flex-row gap-4">
          <a
            href="https://drive.google.com/drive/folders/1YQQZ8UNYtvbC07pFpyh0_jVMAfFVd4DF?usp=sharing"
            target="_blank"
            download
            rel="noopener noreferrer"
            aria-label="Download Mahmoud El-Shafey's CV (opens in a new tab)"
            class="px-5 py-3 rounded-[var(--radius-xl)] bg-byzantium text-seasalt text-sm font-medium
                   shadow-[var(--shadow-glow-purple)] hover:opacity-90 transition text-center"
          >
            {{ locale.about.cta.downloadCV }}
          </a>

          <a
            :href="`mailto:${email}`"
            aria-label="Email Mahmoud El-Shafey"
            class="px-5 py-3 rounded-[var(--radius-xl)] bg-white/0 text-seasalt/70 text-sm font-medium border border-white/15
                   hover:text-seasalt hover:bg-white/5 transition text-center"
          >
            {{ locale.about.cta.contact }}
          </a>
        </div>
      </div>

      <!-- RIGHT: Stats card -->
      <div
        class="rounded-[var(--radius-2xl)] bg-white/5 backdrop-blur-xl border border-lilac p-6 md:p-8
               text-seasalt shadow-[var(--shadow-glow-purple)]
               transition-all duration-300 hover:scale-[1.01] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]"
      >
        <ul class="space-y-6 text-sm md:text-base">
          <li
            v-for="stat in locale.about.stats"
            :key="stat.label"
            class="flex flex-col"
          >
            <span class="text-seasalt/50 uppercase text-[0.7rem] tracking-wide">{{ stat.label }}</span>
            <span class="text-seasalt font-medium">{{ stat.main }}</span>
            <span class="text-lilac text-sm">{{ stat.sub }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
/* non-scoped so it reaches v-html content */
.bio-text strong { font-weight: 600; }
.bio-text em     { font-style: normal; color: var(--color-lilac); }
</style>
