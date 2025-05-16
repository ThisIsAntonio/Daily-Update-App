import NavBar from '@/components/NavBar'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <NavBar />
      <div className="p-8">
        <p>Contenido de prueba</p>
      </div>
    </main>
  )
}
