<!-- directory: app/components/molecules/SectionHeader.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  title: string
  center?: boolean
}>()

const containerEl = ref<HTMLElement | null>(null)
const progress = ref(0) // 0 = no line, 1 = full line

let obs: IntersectionObserver | null = null

onMounted(() => {
  obs = new IntersectionObserver(
    entries => {
      const entry = entries[0]
      if (!entry) return

      // IntersectionObserver gives us how much of the element is visible (0 to 1).
      // We'll just map that directly to the line width.
      // When you scroll up and it leaves, it shrinks again.
      const ratio = entry.intersectionRatio
      progress.value = ratio
    },
    {
      // we want a smooth ratio between 0 and 1 while scrolling
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      rootMargin: '0px 0px -20% 0px', 
      // rootMargin pulls the "disappear" moment a bit earlier so it looks snappy
    }
  )

  if (containerEl.value) {
    obs.observe(containerEl.value)
  }
})

onBeforeUnmount(() => {
  if (obs && containerEl.value) {
    obs.unobserve(containerEl.value)
    obs.disconnect()
  }
})
</script>

<template>
  <div
    ref="containerEl"
    class="w-full mb-10 flex flex-col"
    :class="center ? 'items-center text-center' : 'items-start text-left'"
  >
    <h2 class="text-2xl md:text-3xl font-semibold text-seasalt">
      {{ title }}
    </h2>

    <!-- full-width gradient rule that grows & shrinks with scroll -->
    <div class="relative w-full mt-3 h-[2px] overflow-hidden rounded-full bg-transparent">
      <div
        class="h-full bg-gradient-to-r from-byzantium via-lilac to-transparent shadow-[0_0_20px_rgba(116,34,108,0.7)] transition-[width] duration-150 ease-linear"
        :style="{ width: (progress * 100) + '%' }"
      />
    </div>
  </div>
</template>
