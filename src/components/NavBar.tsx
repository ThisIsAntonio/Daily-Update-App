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
<nav className="bg-[var(--background)] text-[var(--foreground)] px-6 py-2 sm:py-4 shadow transition-colors border-b border-gray-300 dark:border-gray-700 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* User & logout */}
        <div className="flex items-center gap-3 text-base font-semibold">
          {userId && (
            <>
              <span className="text-lg">👋 </span>
              <span className="text-lg font-bold">Hello {userId}!&nbsp;&nbsp;&nbsp;</span>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm font-medium px-3 py-1 rounded hover:brightness-110 transition"
              >
                Log out
              </button>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center">Daily Update App</h1>

        {/* Switch + right button */}
        <div className="flex items-center gap-4">
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
      </div>
    </nav>
  )
}
