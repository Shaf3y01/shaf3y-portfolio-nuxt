<!-- directory: app/components/organisms/ContactSection.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'

const email = 'shaf3y.hired@gmail.com'

// replace with your real links when you want
const githubUrl = 'https://github.com/Shaf3y01'
const linkedinUrl = 'https://www.linkedin.com/in/shaf3y01'

const contactCardRef = ref<HTMLElement | null>(null)
const contactVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0]
      if (!entry) return

      contactVisible.value = entry.isIntersecting
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px',
    }
  )

  requestAnimationFrame(() => {
    const el = contactCardRef.value
    if (el) {
      observer?.observe(el)
    }
  })
})

onBeforeUnmount(() => {
  const el = contactCardRef.value
  if (el && observer) {
    observer.unobserve(el)
  }
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    id="contact"
    class="py-20 lg:py-28 scroll-mt-24"
    aria-labelledby="contact-cta-title"
    aria-describedby="contact-cta-description"
  >
    <SectionHeader title="Let's Build Something" :center="true" />

    <div class="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
      <!-- glass card CTA -->
      <article
        ref="contactCardRef"
        class="contact-card w-full rounded-[var(--radius-2xl)]
               bg-white/5 backdrop-blur-xl border border-white/10
               shadow-[var(--shadow-glow-purple)]
               p-6 md:p-10
               transition-all duration-500 ease-in-out
               hover:scale-[1.03] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]
               text-seasalt flex flex-col items-center"
        :class="contactVisible ? 'contact-card--visible' : 'contact-card--hidden'"
        aria-labelledby="contact-cta-title"
        aria-describedby="contact-cta-description"
      >
        <!-- availability badge -->
        <div
          class="mb-4 flex flex-wrap items-center justify-center gap-2"
          aria-label="Availability status"
        >
          <span
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.7rem] font-medium
                   bg-byzantium/20 text-seasalt border border-byzantium/60
                   shadow-[0_0_20px_rgba(116,34,108,0.8)]
                   whitespace-nowrap"
            aria-label="Open to new opportunities"
          >
            <span
              class="size-2.5 rounded-full bg-lilac shadow-[0_0_10px_rgba(182,158,191,0.9)]"
              aria-hidden="true"
            />
            Open to opportunities
          </span>

          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-medium
                   bg-white/10 text-seasalt/80 border border-white/20
                   backdrop-blur-xl"
            aria-label="Accepting freelance, internship, and full-time work"
          >
            <Icon name="mdi:clock-outline" class="size-3.5 text-seasalt/60" aria-hidden="true" />
            <span>Freelance / Intern / Full-time</span>
          </span>
        </div>

        <!-- headline -->
        <h3
          id="contact-cta-title"
          class="text-seasalt text-xl md:text-2xl font-semibold leading-snug"
        >
          Have a product idea, dashboard, or feature you want built?
        </h3>

        <p
          id="contact-cta-description"
          class="text-seasalt/70 text-sm md:text-base leading-relaxed mt-4 max-w-xl"
        >
          I ship fast, data-driven web experiences. Whether you need a high-converting
          landing page, an e-commerce flow, or analytics that actually drive decisions,
          I can help.
        </p>

        <!-- action buttons -->
        <div
          class="mt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full"
          aria-label="Primary contact actions"
        >
          <!-- email me -->
          <a
            :href="`mailto:${email}`"
            class="px-5 py-3 rounded-[var(--radius-xl)] bg-byzantium text-seasalt text-sm font-medium
                   shadow-[var(--shadow-glow-purple)]
                   hover:opacity-90 transition
                   flex items-center gap-2"
            :aria-label="`Send an email to ${email}`"
          >
            <Icon name="mdi:email-outline" class="size-5" aria-hidden="true" />
            <span>Email Me</span>
          </a>

          <!-- download CV -->
          <a
            href="https://drive.google.com/drive/folders/1YQQZ8UNYtvbC07pFpyh0_jVMAfFVd4DF?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            download
            class="px-5 py-3 rounded-[var(--radius-xl)] bg-white/0 text-seasalt/70 text-sm font-medium
                   border border-white/15
                   hover:text-seasalt hover:bg-white/5 transition
                   flex items-center gap-2"
            aria-label="Download my CV from Google Drive"
          >
            <Icon name="mdi:file-account-outline" class="size-5" aria-hidden="true" />
            <span>Download CV</span>
          </a>
        </div>

        <!-- socials row -->
        <ul
          class="mt-8 flex items-center flex-wrap justify-center gap-6 text-seasalt/60 text-sm"
          role="list"
          aria-label="Social and messaging links"
        >
          <!-- github -->
          <li>
            <a
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-2 hover:text-seasalt transition"
              aria-label="Visit my GitHub profile"
            >
              <Icon
                name="mdi:github"
                class="size-5 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <span>GitHub</span>
            </a>
          </li>

          <!-- linkedin -->
          <li>
            <a
              :href="linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-2 hover:text-seasalt transition"
              aria-label="Visit my LinkedIn profile"
            >
              <Icon
                name="mdi:linkedin"
                class="size-5 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <span>LinkedIn</span>
            </a>
          </li>

          <!-- email -->
          <li>
            <a
              :href="`mailto:${email}`"
              class="group flex items-center gap-2 hover:text-seasalt transition"
              :aria-label="`Compose an email to ${email}`"
            >
              <Icon
                name="mdi:email-outline"
                class="size-5 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <span>{{ email }}</span>
            </a>
          </li>

          <!-- WhatsApp -->
          <li>
            <a
              href="https://wa.me/201068493655?text=Hi%20Mahmoud%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-2 hover:text-seasalt text-lilac transition"
              aria-label="Send a WhatsApp message to plus 20 106 849 3655"
            >
              <Icon
                name="mdi:whatsapp"
                class="size-5 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <span>+20 106 849 3655</span>
            </a>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
