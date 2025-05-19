'use client'

import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import PrimaryButton from './PrimaryButton'

type Props = {
    login: (name: string) => void
    isDark: boolean
    setIsDark: (val: boolean) => void
    hasMounted: boolean
}

export default function LoginScreen({ login, hasMounted }: Props) {
    const [name, setName] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        setSubmitting(true)
        login(name.trim())
        setSubmitting(false)
    }
    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
            {/* Login wrapper */}
            <div className="relative w-full max-w-sm px-6 py-8">
                <div className="absolute inset-2 sm:inset-4 rounded-xl animate-border-loop bg-[conic-gradient(at_top_left,_#60a5fa,_#3b82f6,_#2563eb,_#60a5fa)] bg-[length:100%_100%] blur-sm opacity-40 z-0" />

                {/* Login form */}
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4 border p-6 rounded-xl shadow max-w-sm w-full bg-[var(--background)] animate-fade-in">
                    <h2 className="text-xl font-bold text-center">Enter your name</h2>
                    <label htmlFor="name" className="sr-only">Username</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. marcos123"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <PrimaryButton type="submit" className="w-full" disabled={submitting || !name.trim()}>
                        {submitting ? 'Logging in...' : 'Log In'}
                    </PrimaryButton>
                </form>
            </div>

            {/* Dark mode Toggle */}
            {hasMounted && (
                <div className="absolute top-4 right-4 z-10">
                    <ThemeToggle />
                </div>
            )}
        </div>
    )
}
