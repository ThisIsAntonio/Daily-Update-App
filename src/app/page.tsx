'use client'

import { useState, useRef, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import DashboardView from '@/components/DashboardView'
import AddUpdateButton from '@/components/AddUpdateButton'
import { useAuth } from '@/context/AuthContext'
import Footer from '@/components/Footer'

export default function Home() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { userId } = useAuth()
  
  useEffect(() => {
    if (showModal && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [showModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
  
    try {
      const res = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, userId }),
      })
  
      if (!res.ok) {
        throw new Error('Failed to save update.')
      }
  
      setContent('')
      setShowModal(false)
      setSuccess(true)
      setRefreshFlag(!refreshFlag)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)

    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NavBar rightContent={<AddUpdateButton onClick={() => setShowModal(true)} />} />

      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 text-center text-sm shadow animate-bounce">
          ✅ Update saved successfully!
        </div>
      )}

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <DashboardView refresh={refreshFlag} onAddClick={() => setShowModal(true)} />
        </div>
      </main>

      <Footer />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-md transition-all transform scale-100 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">New Update</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you do today?"
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || content.trim() === ''}
                  className={`px-4 py-2 rounded text-white ${
                    loading || content.trim() === ''
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </div>
        </div>
      )}
    </>
  )
}
