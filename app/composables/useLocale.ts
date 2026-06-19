export const useLocale = () => {
  const lang = useState<'en' | 'ar'>('lang', () => 'en')

  const initLang = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('lang') as 'en' | 'ar' | null
      if (saved) lang.value = saved
    }
  }

  const toggle = () => {
    lang.value = lang.value === 'en' ? 'ar' : 'en'
    if (import.meta.client) localStorage.setItem('lang', lang.value)
  }

  return { lang, toggle, initLang }
}
