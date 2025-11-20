<!-- directory: app/components/organisms/AboutSection.vue -->
<script setup lang="ts">
import SectionHeader from '@/components/molecules/SectionHeader.vue'

const email = 'shaf3y.hired@gmail.com'
</script>

<template>
  <section
    class="py-20 lg:py-28"
    aria-label="About Mahmoud El-Shafey section"
  >
    <!-- Section heading -->
    <SectionHeader title="About Me" :center="false" />

    <div class="grid gap-10 lg:grid-cols-[2fr,1fr] lg:gap-16">
      <!-- LEFT: Bio / narrative -->
      <div class="text-seasalt/60 text-base md:text-lg leading-relaxed space-y-5">
        <p>
          I'm a highly analytical and results-driven Computer Science professional,
          currently completing my B.Sc. with a
          <span class="text-seasalt font-semibold">3.19 / 4.0 GPA</span> at
          Tanta University.
          I bridge
          <span class="text-lilac">data analysis</span>
          and
          <span class="text-lilac">full-stack web development</span>
          to solve real business problems.
        </p>

        <p>
          In my recent Data Analyst role, I used NLP techniques to analyze over
          <span class="text-seasalt font-semibold">100K+ chatbot interactions</span>,
          leading to a
          <span class="text-seasalt font-semibold">15% improvement</span>
          in intent recognition.
          I also built Tableau dashboards that cut human agent escalations by
          <span class="text-seasalt font-semibold">10%</span>
          and increased conversion rates by
          <span class="text-seasalt font-semibold">5%</span>.
        </p>

        <p>
          Beyond data, I've shipped production full-stack work.
          I've freelanced on
          <span class="text-seasalt font-semibold">4+ e-commerce builds</span>,
          including:
          Grover (grocery web app),
          Al-Kheima (restaurant landing page),
          and SuitSupply (clothing store).
          I care about clean UI, fast performance, and measurable impact.
        </p>

        <p class="text-seasalt/60 text-sm md:text-base">
          I thrive where product, data, and engineering overlap.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row gap-4">
          <!-- Download CV -->
          <a
            href="https://drive.google.com/drive/folders/1YQQZ8UNYtvbC07pFpyh0_jVMAfFVd4DF?usp=sharing"
            target="_blank"
            download
            rel="noopener noreferrer"
            aria-label="Download Mahmoud El-Shafey's CV (opens in a new tab)"
            class="px-5 py-3 rounded-[var(--radius-xl)] bg-byzantium text-seasalt text-sm font-medium
                   shadow-[var(--shadow-glow-purple)] hover:opacity-90 transition text-center"
          >
            Download CV
          </a>

          <!-- Contact CTA -->
          <a
            :href="`mailto:${email}`"
            aria-label="Email Mahmoud El-Shafey"
            class="px-5 py-3 rounded-[var(--radius-xl)] bg-white/0 text-seasalt/70 text-sm font-medium border border-white/15
                   hover:text-seasalt hover:bg-white/5 transition text-center"
          >
            Contact Me
          </a>
        </div>
      </div>

      <!-- RIGHT: Stat / highlight card -->
      <div
        class="rounded-[var(--radius-2xl)] bg-white/5 backdrop-blur-xl border border-lilac p-6 md:p-8
               text-seasalt shadow-[var(--shadow-glow-purple)]
               transition-all duration-300 hover:scale-[1.01] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]"
      >
        <ul class="space-y-6 text-sm md:text-base">
          <li class="flex flex-col">
            <span class="text-seasalt/50 uppercase text-[0.7rem] tracking-wide">Education</span>
            <span class="text-seasalt font-medium">
              B.Sc. Computer Science, Tanta University
            </span>
            <span class="text-lilac text-sm">GPA 3.19 / 4.0</span>
          </li>

          <li class="flex flex-col">
            <span class="text-seasalt/50 uppercase text-[0.7rem] tracking-wide">Data Impact</span>
            <span class="text-seasalt font-medium">
              100K+ chats cleaned and analyzed with NLP
            </span>
            <span class="text-lilac text-sm">
              +15% intent accuracy, -10% escalations
            </span>
          </li>

          <li class="flex flex-col">
            <span class="text-seasalt/50 uppercase text-[0.7rem] tracking-wide">Product / Growth</span>
            <span class="text-seasalt font-medium">
              Curated 12+ Dashboards for Departments' both individual and conjoined Metrics
            </span>
            <span class="text-lilac text-sm">
              performance tracking & action loops
            </span>
          </li>

          <li class="flex flex-col">
            <span class="text-seasalt/50 uppercase text-[0.7rem] tracking-wide">Full-Stack Work</span>
            <span class="text-seasalt font-medium">
              5+ shipped E-commerce WebApps
            </span>
            <span class="text-lilac text-sm">
              Sixteen Clothing / SuitSupply / Grover / Al-Kheima / SuitSupply
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
