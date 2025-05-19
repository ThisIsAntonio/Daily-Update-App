'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import useDarkMode from '@/hooks/useDarkMode'

type AuthContextType = {
    userId: string | null
    login: (name: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    userId: null,
    login: () => { },
    logout: () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string | null>(null)
    const [isDark, setIsDark, hasMounted] = useDarkMode()
    const [hasMountedAuth, setHasMountedAuth] = useState(false)

    useEffect(() => {
        setHasMountedAuth(true)
        const stored = localStorage.getItem('userId')
        if (stored) setUserId(stored)
    }, [])

    const login = (name: string) => {
        localStorage.setItem('userId', name)
        setUserId(name)
    }

    const logout = () => {
        localStorage.removeItem('userId')
        setUserId(null)
    }
    if (!hasMountedAuth) return null

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
                {/* Login wrapper */}
                <div className="relative w-full max-w-sm px-6 py-8">
                    <div className="absolute inset-2 sm:inset-4 rounded-xl animate-border-loop bg-[conic-gradient(at_top_left,_#60a5fa,_#3b82f6,_#2563eb,_#60a5fa)] bg-[length:100%_100%] blur-sm opacity-40 z-0" />

                    {/* Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value.trim()
                            if (name) login(name)
                        }}
                        className="relative z-10 space-y-4 border p-6 rounded-xl shadow max-w-sm w-full bg-[var(--background)] animate-fade-in"
                    >
                        <h2 className="text-xl font-bold text-center">Enter your name</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. marcos123"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                            Log In
                        </button>
                    </form>
                </div>
                {/* Dark mode Toggle */}
                {hasMounted && (
                    <div className="absolute top-4 right-4 z-10">
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
                                className={`w-6 h-6 bg-[var(--background)] rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 ${isDark ? 'translate-x-7' : ''}`}
                            />
                            <span className="absolute right-0.5 text-xs">🌙</span>
                        </label>
                    </div>
                )}

            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
export { AuthContext }
