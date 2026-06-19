<!-- directory: app/components/organisms/TimelineSection.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'
import { useLocale } from '@/composables/useLocale'
import en from '@/locales/en'
import ar from '@/locales/ar'

const { lang } = useLocale()
const locale = computed(() => (lang.value === 'ar' ? ar : en))

const items = computed(() => locale.value.timeline.items)

const visible = ref<boolean[]>(Array(6).fill(false))

let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver(
        entries => {
            for (const entry of entries) {
                const indexAttr = entry.target.getAttribute('data-index')
                if (indexAttr == null) continue
                const i = parseInt(indexAttr, 10)
                if (entry.isIntersecting) {
                    // fade/slide in when it shows
                    visible.value[i] = true
                } else {
                    // fade/slide out when leaving (so scrolling up reverses)
                    visible.value[i] = false
                }
            }
        },
        {
            threshold: 0.25,
            rootMargin: '0px 0px -10% 0px',
        }
    )

    // observe each card element after mount
    requestAnimationFrame(() => {
        document
            .querySelectorAll<HTMLElement>('[data-timeline-card]')
            .forEach(el => observer?.observe(el))
    })
})

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<template>
    <section id="timeline" class="py-20 lg:py-28 scroll-mt-24">
        <SectionHeader :title="locale.timeline.header" :center="false" />

        <div class="relative max-w-3xl mx-auto pl-6 md:pl-10">
            <!-- vertical line -->
            <div class="absolute left-3 top-0 bottom-0 md:left-4 w-px bg-gradient-to-b from-byzantium via-lilac/40 to-transparent
               shadow-[0_0_20px_rgba(116,34,108,0.6)]"></div>

            <!-- timeline items -->
            <ol class="space-y-12 md:space-y-16">
                <li v-for="(item, i) in items" :key="item.title + i" :data-index="i" data-timeline-card
                    class="relative flex flex-col md:flex-row md:gap-6">
                    <!-- node / marker -->
                    <!-- timeline marker / numbered dot -->
                    <div class="absolute left-0 top-0 translate-x-[-50%]
         flex items-center justify-center
         size-6 md:size-7 rounded-full
         border border-white/30
         bg-white/10 backdrop-blur-xl
         shadow-[0_0_30px_rgba(116,34,108,0.8)]
         text-[0.6rem] font-medium text-seasalt/90
         transition-all duration-300
         relative" :class="visible[i]
            ? 'scale-100 opacity-100 border-byzantium text-seasalt shadow-[0_0_40px_rgba(116,34,108,0.9)] pulse-glow pulse-ripple'
            : 'scale-75 opacity-40'">
                        <span class="hidden md:inline-block">{{ items.length - i }}</span>
                        <span class="md:hidden">•</span>
                    </div>

                    <!-- timeline card -->
                    <div class="relative flex-1 rounded-[var(--radius-2xl)]
         bg-white/5 backdrop-blur-xl border border-white/10
         shadow-[var(--shadow-glow-purple)]
         p-6 md:p-7
         transition-all duration-300
         hover:scale-[1.03] hover:border-byzantium hover:shadow-[0_0_50px_rgba(116,34,108,0.8)]
         text-seasalt ml-10 md:ml-12" :class="visible[i]
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'">
                        <!-- header row -->
                        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                                <h3 class="text-seasalt font-semibold text-base md:text-lg leading-tight">
                                    {{ item.title }}
                                </h3>
                                <div class="text-lilac text-sm font-medium leading-snug">
                                    {{ item.org }}
                                </div>
                            </div>

                            <div class="text-seasalt/60 text-xs md:text-sm leading-relaxed md:text-right">
                                {{ item.date }}
                            </div>
                        </div>

                        <!-- bullets -->
                        <ul class="mt-4 space-y-2 text-seasalt/70 text-sm leading-relaxed">
                            <li v-for="(point, j) in item.bullets" :key="j" class="flex items-start gap-2">
                                <div
                                    class="mt-[0.4rem] size-1.5 rounded-full bg-byzantium shadow-[0_0_10px_rgba(116,34,108,0.9)]">
                                </div>
                                <div class="flex-1">
                                    {{ point }}
                                </div>
                            </li>
                        </ul>
                    </div>

                </li>
            </ol>
        </div>
    </section>
</template>

<style scoped>
/* Main glow pulse on the dot itself */
@keyframes glowPulse {
    0% {
        box-shadow: 0 0 0 rgba(116, 34, 108, 0.5);
        transform: scale(1);
    }

    50% {
        box-shadow: 0 0 25px rgba(116, 34, 108, 0.8);
        transform: scale(1.1);
    }

    100% {
        box-shadow: 0 0 0 rgba(116, 34, 108, 0.5);
        transform: scale(1);
    }
}

.pulse-glow {
    animation: glowPulse 2.2s ease-in-out infinite;
}

/* Ripple ring that radiates out from the marker */
@keyframes rippleWave {
    0% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1);
        box-shadow: 0 0 20px rgba(116, 34, 108, 0.6),
            0 0 40px rgba(116, 34, 108, 0.4);
    }

    70% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(2.2);
        box-shadow: 0 0 30px rgba(116, 34, 108, 0.4),
            0 0 60px rgba(116, 34, 108, 0.25);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(2.2);
        box-shadow: 0 0 30px rgba(116, 34, 108, 0.4),
            0 0 60px rgba(116, 34, 108, 0.25);
    }
}

/* We attach ::after to the marker element to create a soft expanding ring */
.pulse-ripple::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    border-radius: 9999px;
    background: radial-gradient(circle at center,
            rgba(116, 34, 108, 0.4) 0%,
            rgba(116, 34, 108, 0) 70%);
    animation: rippleWave 2.2s ease-out infinite;
    pointer-events: none;
    /* make sure the ripple sits behind the number text itself */
    z-index: -1;
}
</style>
