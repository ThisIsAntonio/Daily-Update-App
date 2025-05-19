'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import LoginScreen from '@/components/LoginScreen'
import Footer from '@/components/Footer'

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

    useEffect(() => {
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
    if (!hasMounted) return null

    if (!userId) {
        return (
            <>
                <LoginScreen login={login} isDark={isDark} setIsDark={setIsDark} hasMounted={hasMounted} />
                <Footer />
            </>
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
