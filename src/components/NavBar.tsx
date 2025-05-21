'use client'

import type { ReactNode } from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import { useAuth } from '@/context/AuthContext'
import PrimaryButton from './PrimaryButton'
import ThemeToggle from './ThemeToggle'
import AppHeaderTitle from './AppHeaderTitle'

type NavBarProps = {
  rightContent?: ReactNode
}
export default function NavBar({ rightContent }: NavBarProps) {
  const [ hasMounted] = useDarkMode()
  const { userId, logout } = useAuth()
  console.log('hasMounted', hasMounted)
  //if (!hasMounted) return null

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] px-6 py-2 sm:py-4 shadow transition-colors border-b border-gray-300 dark:border-gray-700 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* User & logout */}
        <div className="flex items-center gap-3 text-base font-semibold">
          {userId && (
            <>
              <span className="text-lg">👋 </span>
              <span className="text-lg font-bold">Hello {userId}!&nbsp;&nbsp;&nbsp;</span>
              <PrimaryButton onClick={logout} className="text-sm px-3 py-1">
                Log out
              </PrimaryButton>

            </>
          )}
        </div>

        {/* Title */}
        <AppHeaderTitle />

        {/* Switch + right button */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {rightContent}
        </div>
      </div>
    </nav>
  )
}
