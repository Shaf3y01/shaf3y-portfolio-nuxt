<!-- directory: app/components/organisms/HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* ---------------------------
   Typing animation (unchanged)
---------------------------- */
const fullName = 'Mahmoud El-Shafey'
const fullRole = 'Data Analyst & Fullstack Web Developer'
const fullTagline =
  'I build data-driven web experiences and intelligent dashboards that actually move metrics — not just look pretty.'

const typedName = ref('')
const typedRole = ref('')
const typedTagline = ref('')
const showTaglineCursor = ref(false)

onMounted(() => {
  // 1. type name
  let i = 0
  const nameTimer = setInterval(() => {
    typedName.value += fullName[i] ?? ''
    i++
    if (i >= fullName.length) {
      clearInterval(nameTimer)

      // 2. then role
      setTimeout(() => {
        let j = 0
        const roleTimer = setInterval(() => {
          typedRole.value += fullRole[j] ?? ''
          j++
          if (j >= fullRole.length) {
            clearInterval(roleTimer)

            // 3. then tagline
            setTimeout(() => {
              showTaglineCursor.value = true // <-- start blinking now & never stop
              let k = 0
              const taglineTimer = setInterval(() => {
                typedTagline.value += fullTagline[k] ?? ''
                k++
                if (k >= fullTagline.length) {
                  clearInterval(taglineTimer)
                }
              }, 20)
            }, 300)
          }
        }, 30)
      }, 300)
    }
  }, 40)
})

/* -------------- */
const workEmail = 'shaf3y.hired@gmail.com'
function scrollToProjects() {
  const el = document.getElementById('projects')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------------------
   Floating “emoji bubbles”
   - They update every 1.8s
   - They never match each other
   - We'll render them with <Icon />
   - We'll size the actual icon ~3.2rem
---------------------------- */
const iconPool = [
  // dev / tech / creativity / thinking
  'mdi:rocket-launch',
  'mdi:flash',
  'mdi:terminal',
  'mdi:code-tags',
  'mdi:lightbulb-on-outline',
  'mdi:head-lightbulb',
  'mdi:vector-curve',
  'mdi:palette',
  'mdi:brush',
  'mdi:pen',
  'mdi:monitor-dashboard'
]

const leftIcon = ref('mdi:rocket-launch')
const rightIcon = ref('mdi:palette')
let shuffleTimer: ReturnType<typeof setInterval> | null = null

function shuffleIcons() {
  let newLeft = iconPool[Math.floor(Math.random() * iconPool.length)] ?? leftIcon.value
  let newRight = iconPool[Math.floor(Math.random() * iconPool.length)] ?? rightIcon.value

  // ensure no duplicates at the same tick
  if (newRight === newLeft) {
    // pick again for right until it's different
    const filtered = iconPool.filter(i => i !== newLeft)
    newRight =
      filtered[Math.floor(Math.random() * filtered.length)] ??
      rightIcon.value
  }

  leftIcon.value = newLeft
  rightIcon.value = newRight
}

onMounted(() => {
  shuffleIcons()
  shuffleTimer = setInterval(shuffleIcons, 2250)
})

onBeforeUnmount(() => {
  if (shuffleTimer) {
    clearInterval(shuffleTimer)
  }
})
</script>


<template>
  <section
    class="relative flex flex-col-reverse items-center gap-12
           pt-24 pb-28
           md:pt-28 md:pb-32
           lg:flex-row lg:items-start lg:justify-center lg:gap-16
           xl:gap-24
           2xl:gap-32">
    <!-- ========================================================= -->
    <!-- LEFT: Text block / glass card (KEEP OUR ORIGINAL LAYOUT) -->
    <!-- ========================================================= -->
    <div
      class="relative z-10
             w-full max-w-xl
             md:max-w-2xl
             lg:max-w-[46rem] xl:max-w-[48rem]
             text-center lg:text-left
             rounded-[var(--radius-2xl)]
             bg-white/5 backdrop-blur-xl border border-white/10
             shadow-[var(--shadow-glow-purple)]
             transition-all duration-300
             hover:scale-[1.01] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]
             px-6 py-8 md:px-10 md:py-12"
    >
      <!-- NAME + ROLE block with a reserved height to stop layout jump -->
      <div class="relative">
        <!-- 1. Invisible final layout snapshot (stops jump) -->
        <div class="invisible">
          <!-- final name -->
          <h1
            class="text-[2.5rem] leading-tight font-semibold text-seasalt
                   md:text-[3rem] md:leading-[1.15]
                   lg:text-[3.5rem] lg:leading-[1.15]
                   xl:text-[3.75rem] xl:leading-[1.15] font-display"
          >
            <span class="text-seasalt">
              Mahmoud
              <!-- force first/last name break for very tiny screens but DON'T split "El-" / "Shafey" -->
              <span class="hidden [@media(max-width:425px)]:inline"><br /></span>
              <span class="[@media(max-width:425px)]:inline-block whitespace-nowrap">&nbsp;El-Shafey</span>
            </span>
          </h1>

          <!-- final role -->
          <p
            class="mt-4 md:mt-5 lg:mt-6
                   text-xl md:text-2xl lg:text-[1.5rem] font-medium
                   flex flex-wrap justify-center lg:justify-start
                   text-lilac leading-snug font-mono tracking-tight"
          >
            {{ fullRole }}
          </p>
        </div>

        <!-- 2. Absolutely positioned live typing version -->
        <div class="absolute inset-0">
          <!-- animated name -->
          <h1
            class="text-[2.5rem] leading-tight font-semibold text-seasalt
                   md:text-[3rem] md:leading-[1.15]
                   lg:text-[3.5rem] lg:leading-[1.15]
                   xl:text-[3.75rem] xl:leading-[1.15]
                   text-center lg:text-left font-display"
          >
            <span class="text-seasalt">
              <template v-if="typedName.length">
                <!-- first chunk up to first space -->
                <span>
                  {{
                    typedName.includes(' ')
                      ? typedName.slice(0, typedName.indexOf(' '))
                      : typedName
                  }}
                </span>

                <!-- break ONLY on tiny viewports.
                     This guarantees we never get "El-" on one line and "Shafey" on the next,
                     because we treat 'El-Shafey' as a single block below. -->
                <span
                  class="hidden [@media(max-width:425px)]:inline"
                  v-if="typedName.includes(' ')"
                >
                  <br />
                </span>

                <!-- rest of name (starting at first space).
                     Wrap it in whitespace-nowrap so "El-Shafey" never breaks mid-dash. -->
                <span
                  v-if="typedName.includes(' ')"
                  class="[@media(max-width:425px)]:inline-block whitespace-nowrap"
                >
                  {{
                    ' ' +
                    typedName.slice(
                      typedName.indexOf(' ') + 1,
                      typedName.length
                    )
                  }}
                </span>
              </template>

              <!-- blinking cursor while name still typing -->
              <span
                class="inline-block w-[1ch] bg-seasalt align-baseline animate-pulse"
                v-if="typedName.length !== fullName.length"
              ></span>
            </span>
          </h1>

          <!-- animated role + cursor -->
          <div
            class="mt-4 md:mt-5 lg:mt-6
                   text-xl md:text-2xl lg:text-[1.5rem] font-medium
                   flex flex-wrap justify-center lg:justify-start
                   text-lilac leading-snug
                   text-center lg:text-left font-mono tracking-tight"
          >
            <span>{{ typedRole }}</span>
            <span
              class="inline-block w-[1ch] bg-lilac/80 align-baseline animate-pulse"
              v-if="typedRole.length !== fullRole.length"
            ></span>
          </div>
        </div>
      </div>

      <!-- animated tagline (height reserved to prevent jump) -->
      <div
        class="relative mt-6 text-seasalt/70
               text-base md:text-lg leading-relaxed
               text-center lg:text-left"
      >
        <!-- invisible block to lock height -->
        <p class="invisible">
          I build data-driven web experiences and intelligent dashboards that
          actually move metrics — not just look pretty.
        </p>

        <!-- live type layer -->
        <p class="absolute inset-0">
          <span>{{ typedTagline }}</span>
          <!-- keep blinking FOREVER once tagline cursor shows -->
          <span
            v-if="showTaglineCursor"
            class="tagline-cursor align-baseline"
          ></span>
        </p>
      </div>

      <!-- CTA buttons -->
      <div
        class="mt-8 flex flex-col sm:flex-row flex-wrap
               items-center justify-center lg:justify-start gap-4"
      >
        <!-- View Work -->
        <button
          @click="scrollToProjects"
          class="px-5 py-3 rounded-[var(--radius-xl)]
                 bg-byzantium text-seasalt text-sm font-medium
                 shadow-[var(--shadow-glow-purple)]
                 hover:opacity-90 transition"
        >
          View Work
        </button>

        <!-- Contact Me -->
        <a
          class="px-5 py-3 rounded-[var(--radius-xl)]
                 bg-white/5 text-seasalt text-sm font-medium
                 border border-white/15 backdrop-blur-xl
                 hover:bg-white/10 transition"
          :href="`mailto:${workEmail}`"
        >
          Contact Me
        </a>

        <!-- Download CV -->
        <a
          class="px-5 py-3 rounded-[var(--radius-xl)]
                 bg-white/0 text-seasalt/70 text-sm font-medium
                 border border-white/15
                 hover:text-seasalt hover:bg-white/5 transition"
          href="https://drive.google.com/drive/folders/1YQQZ8UNYtvbC07pFpyh0_jVMAfFVd4DF?usp=sharing"
          target="_blank"
          download
        >
          Download CV
        </a>
      </div>

      <!-- social icons row -->
      <div
        class="mt-8 flex flex-wrap gap-x-6 gap-y-3
               items-center justify-center lg:justify-start
               text-seasalt/60 text-sm"
      >
        <!-- GitHub -->
        <a
          href="https://github.com/Shaf3y01"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2 hover:text-seasalt transition"
        >
          <Icon
            name="mdi:github"
            class="size-5 group-hover:scale-110 transition-transform"
          />
          <span class="hidden sm:inline-block">GitHub</span>
        </a>

        <!-- LinkedIn -->
        <a
          href="https://www.linkedin.com/in/shaf3y01"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2 hover:text-seasalt transition"
        >
          <Icon
            name="mdi:linkedin"
            class="size-5 group-hover:scale-110 transition-transform"
          />
          <span class="hidden sm:inline-block">LinkedIn</span>
        </a>

        <!-- Email -->
        <a
          :href="`mailto:${workEmail}`"
          class="group flex items-center gap-2 hover:text-seasalt transition"
        >
          <Icon
            name="mdi:email-outline"
            class="size-5 group-hover:scale-110 transition-transform"
          />
          <span class="hidden sm:inline-block">Email</span>
        </a>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- RIGHT: avatar / glow blob / emoji bubbles  -->
    <!-- ===================================================== -->
    <div
      class="relative z-10 flex-shrink-0 flex items-center justify-center
             animate-hero-pop
             /* keep heroPop from your working version */"
    >
      <!-- purple glow -->
      <div
        class="absolute inset-0 blur-3xl opacity-60 pointer-events-none"
        style="
          background: radial-gradient(
            circle at center,
            rgba(116,34,108,.6) 0%,
            rgba(34,40,35,0) 70%
          );
          filter: drop-shadow(0 0 40px rgba(116,34,108,0.6));
        "
      ></div>

      <!-- glassy outer ring  -->
      <div
        class="relative rounded-full p-[3px]
               bg-white/10 border border-white/15
               backdrop-blur-xl
               shadow-[var(--shadow-glow-purple)]
               size-48 md:size-64 lg:size-80 xl:size-96
               flex items-center justify-center
               transition-all duration-500
               hover:scale-[1.05] hover:border-byzantium hover:shadow-[0_0_60px_rgba(116,34,108,0.85)]"
      >
        <!-- inner dark circle -->
        <div
          class="rounded-full bg-[#0d0d0f] flex items-center justify-center
                 size-[12rem] md:size-[16rem] lg:size-[19rem] xl:size-[21rem]
                 overflow-hidden border border-white/10
                 shadow-[0_0_25px_rgba(116,34,108,0.6)]"
        >
          <img
            src="/me.png"
            alt="Mahmoud El-Shafey"
            class="w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>

        <!-- LEFT bubble -->
        <div
          class="absolute
                 top-[68%]
                 -left-8 md:-left-10 lg:-left-12
                 translate-y-[-50%]
                 pointer-events-none"
        >
          <div
            class="hero-bubble hero-bubble--left
                   flex items-center justify-center
                   size-14 md:size-16 lg:size-20"
          >
            <Icon
              :name="leftIcon"
              class="text-[3.7rem] leading-none"
              aria-hidden="true"
            />
          </div>
        </div>

        <!-- RIGHT bubble -->
        <div
          class="absolute
                 top-[68%]
                 -right-8 md:-right-10 lg:-right-12
                 translate-y-[-50%]
                 pointer-events-none"
        >
          <div
            class="hero-bubble hero-bubble--right
                   flex items-center justify-center
                   size-14 md:size-16 lg:size-20"
          >
            <Icon
              :name="rightIcon"
              class="text-[3.7rem] leading-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- floating particles-->
    <div class="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <div
        class="absolute top-10 left-1/3 size-2 rounded-full bg-byzantium/70 blur-[2px] opacity-80 animate-float-slow">
      </div>
      <div
        class="absolute bottom-16 right-1/4 size-1.5 rounded-full bg-lilac/60 blur-[1px] opacity-70 animate-float-medium">
      </div>
      <div class="absolute top-1/2 right-12 size-1 rounded-full bg-seasalt/40 blur-[1px] opacity-60 animate-float-fast">
      </div>
      <div
        class="absolute top-[20%] left-[10%] size-1.5 rounded-full bg-byzantium/40 blur-[2px] opacity-50 animate-float-medium">
      </div>
      <div
        class="absolute bottom-[20%] left-[45%] size-2 rounded-full bg-lilac/30 blur-[3px] opacity-40 animate-float-slow">
      </div>
    </div>
  </section>
</template>


<style scoped>
/* ------------------------
   Forever blinking cursor
-------------------------*/
.tagline-cursor {
  display: inline-block;
  width: 0.6ch;
  height: 1em;
  background-color: rgb(116 34 108); /* byzantium */
  margin-left: 0.5rem;
  box-shadow: 0 0 8px rgba(116, 34, 108, 0.8);
  animation: taglineBlink 1s steps(2, start) infinite;
  vertical-align: -0.1em;
}
@keyframes taglineBlink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* ------------------------
   Emoji bubble palette & anims
-------------------------*/
:root {
  --color-eerie: #222823;
  --color-seasalt: #f4f7f5;
  --color-lilac: #b69ebf;
  --color-byzantium: #74226c;
  --emoji-bg: rgba(34, 40, 35, 0.55);
  --emoji-border: rgba(182, 158, 191, 0.75);
  --emoji-glow: rgba(116, 34, 108, 0.85);
  --emoji-glow-soft: rgba(182, 158, 191, 0.7);
  --emoji-icon: var(--color-seasalt);
}
[data-theme='day'] {
  --emoji-bg: rgba(182, 158, 191, 0.18);
  --emoji-border: rgba(116, 34, 108, 0.65);
  --emoji-glow: rgba(182, 158, 191, 0.85);
  --emoji-glow-soft: rgba(116, 34, 108, 0.6);
  --emoji-icon: var(--color-byzantium);
}

.hero-bubble {
  position: relative;
  border-radius: 9999px;
  border: 1.5px solid var(--emoji-border);
  background:
    radial-gradient(circle at 30% 30%, rgba(182, 158, 191, 0.25), rgba(116, 34, 108, 0.12)),
    var(--emoji-bg);
  /* color: var(--emoji-icon); */
  box-shadow:
    0 0 0.8rem var(--emoji-glow),
    0 0 2.6rem var(--emoji-glow-soft),
    inset 0 0 1.2rem rgba(244, 247, 245, 0.08);
  --bubble-float-distance: -4px;
  animation: fadeDownPop 0.75s ease-out both, bubbleFloat 4.2s ease-in-out infinite 0.75s;
  backdrop-filter: blur(6px);
}
.hero-bubble::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  border: 1px solid rgba(244, 247, 245, 0.15);
  opacity: 0.55;
  box-shadow: 0 0 12px rgba(244, 247, 245, 0.15);
  pointer-events: none;
}
.hero-bubble--right {
  color: var(--color-lilac);
  --bubble-float-distance: -5px;
  animation-duration: 0.82s, 3.8s;
  animation-delay: 0.05s, 0.82s;
}
.hero-bubble--left {
  color: var(--color-lilac);
  animation-duration: 0.75s, 4.4s;
}

@keyframes fadeDownPop {
  0% {
    opacity: 0;
    transform: translateY(-40px) scale(0.6);
  }
  60% {
    opacity: 1;
    transform: translateY(6px) scale(1.08);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bubbleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(var(--bubble-float-distance)) scale(1.05);
  }
}

/* ------------------------
   Particle float 
-------------------------*/
@keyframes floatSlow {
  0%   { transform: translateY(0px) translateX(0px); }
  50%  { transform: translateY(-9px) translateX(6px); }
  100% { transform: translateY(0px) translateX(0px); }
}
@keyframes floatMed {
  0%   { transform: translateY(0px) translateX(0px); }
  50%  { transform: translateY(-12px) translateX(-8px); }
  100% { transform: translateY(0px) translateX(0px); }
}
@keyframes floatFast {
  0%   { transform: translateY(0px) translateX(0px); opacity: 0.6; }
  50%  { transform: translateY(-3px) translateX(2px); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
}
.animate-float-slow   { animation: floatSlow 4s ease-in-out infinite; }
.animate-float-medium { animation: floatMed 3s ease-in-out infinite; }
.animate-float-fast   { animation: floatFast 2.2s ease-in-out infinite; }

/* ------------------------
   hero avatar entrance
-------------------------*/
@keyframes heroPop {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    filter: drop-shadow(0 0 0 rgba(116, 34, 108, 0));
  }
  60% {
    opacity: 1;
    transform: translateY(0px) scale(1.07);
    filter: drop-shadow(0 0 30px rgba(116, 34, 108, 0.6));
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
    filter: drop-shadow(0 0 20px rgba(116, 34, 108, 0.4));
  }
}
.animate-hero-pop {
  animation: heroPop 0.7s ease-out both;
}
</style>
