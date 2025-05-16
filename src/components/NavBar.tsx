'use client'

import type { ReactNode } from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import { useAuth } from '@/context/AuthContext'

type NavBarProps = {
  rightContent?: ReactNode
}
export default function NavBar( { rightContent }: NavBarProps) {
  const [isDark, setIsDark, hasMounted] = useDarkMode()
  const { userId, logout } = useAuth()

  if (!hasMounted) return null

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] px-6 py-4 flex justify-between items-center shadow transition-colors">
      <div className="w-1/3 flex items-center gap-2 text-sm font-medium">
        {userId && (
          <>
            👋 <span className="text-lg">Hello {userId}!&nbsp;&nbsp;&nbsp;</span>
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
              Log out
            </button>
          </>
        )}
      </div>
      <h1 className="text-4xl font-bold text-center w-1/3">Daily Update App</h1>
      <div className="w-1/3 text-right flex justify-end items-center gap-4">
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
            className={`w-6 h-6 bg-[var(--background)] rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 ${
              isDark ? 'translate-x-7' : ''
            }`}
          />
          <span className="absolute right-0.5 text-xs">🌙</span>
        </label>
        {rightContent}
      </div>
    </nav>
  )
}
