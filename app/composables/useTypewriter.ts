// directory: app/composables/useTypewriter.ts
import { ref, onMounted } from 'vue'

export interface TypeLine {
  text: string
  speed?: number
  pauseAfter?: number
}

export function useTypewriter(lines: TypeLine[]) {
  const outputs = lines.map(() => ref(''))
  const isRunning = ref(false)
  const done = ref(false)

  onMounted(async () => {
    isRunning.value = true
    for (const [li, line] of lines.entries()) {
      const { text, speed = 30, pauseAfter = 250 } = line
      for (let i = 0; i < text.length; i++) {
        if (outputs[li]) {
          outputs[li].value += text[i]
        }
        await new Promise(r => setTimeout(r, speed))
      }
      if (li < lines.length - 1) await new Promise(r => setTimeout(r, pauseAfter))
    }
    done.value = true
    isRunning.value = false
  })

  return { outputs, isRunning, done }
}
