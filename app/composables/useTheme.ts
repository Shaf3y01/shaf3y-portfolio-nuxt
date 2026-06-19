export const useTheme = () => {
  const theme = useState<'night' | 'day'>('theme', () => 'night')

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme') as 'night' | 'day' | null
      if (saved) theme.value = saved
    }
  }

  const toggle = () => {
    theme.value = theme.value === 'night' ? 'day' : 'night'
    if (import.meta.client) localStorage.setItem('theme', theme.value)
  }

  return { theme, toggle, initTheme }
}
