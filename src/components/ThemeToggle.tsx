// components/ThemeToggle.tsx
'use client'
import useDarkMode from '@/hooks/useDarkMode'

export default function ThemeToggle() {
    const [isDark, setIsDark, hasMounted] = useDarkMode()

    if (!hasMounted) return null

    return (
        <label className="relative inline-flex items-center cursor-pointer w-14 h-7">
            <span className="absolute left-0.5 text-xs">🌞</span>
            <input
                type="checkbox"
                checked={isDark}
                onChange={() => setIsDark(!isDark)}
                className="sr-only peer"
            />
            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-blue-600 dark:bg-gray-600 transition" />
            <div
                className={`w-6 h-6 bg-[var(--background)] rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 ${isDark ? 'translate-x-7' : ''
                    }`}
            />
            <span className="absolute right-0.5 text-xs">🌙</span>
        </label>
    )
}
