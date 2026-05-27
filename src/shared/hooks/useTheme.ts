import { useAppStore } from '@/app/store/app.store'

export function useTheme() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)
  const setTheme = useAppStore((s) => s.setTheme)

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' }
}
