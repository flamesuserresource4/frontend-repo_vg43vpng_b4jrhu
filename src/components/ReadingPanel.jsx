import { useEffect, useMemo, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ReadingPanel() {
  const [sessionId] = useState(() => Math.random().toString(36).slice(2))
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [cards, setCards] = useState([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    // Activate oracle phrase on mount
    fetch(`${baseUrl}/api/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId })
    }).catch(() => {})
  }, [sessionId])

  const ctaLink = useMemo(() => {
    return 'https://wa.me/0000000000?text=I%20seek%20the%20Hidden%20Card%20and%20personal%20ritual.'
  }, [])

  const pull = async () => {
    setLoading(true)
    setAlert(null)
    try {
      const res = await fetch(`${baseUrl}/api/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      })
      const data = await res.json()

      if (Array.isArray(data)) {
        // Alert structure from backend
        setAlert(data[0])
        setCards([])
        setMessage('')
      } else {
        setCards(data.cards || [])
        setMessage(data.message || '')
      }
    } catch (e) {
      setAlert({ name: 'alert', description: 'The veil trembled. Try again shortly.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-10 md:py-14">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-6 md:p-8 backdrop-blur">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-white">The Oracle Table</h2>
            <button
              onClick={pull}
              disabled={loading}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Listening…' : 'Pull 3 Cards'}
            </button>
          </div>

          {alert && (
            <div className="mb-4 rounded-lg border border-yellow-400/30 bg-yellow-500/10 text-yellow-200 p-4">
              <p className="font-medium">{alert.description}</p>
            </div>
          )}

          {cards.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {cards.map((c, i) => (
                  <div key={i} className="rounded-xl border border-blue-400/20 bg-slate-800/60 p-4 text-center">
                    <div className="text-4xl mb-2">{c.symbol}</div>
                    <div className="text-white font-semibold">{c.name}</div>
                    <div className="text-blue-200/80 text-sm">{c.meaning}</div>
                  </div>
                ))}
              </div>
              <pre className="whitespace-pre-wrap text-blue-100/90 text-sm leading-relaxed">{message}</pre>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <a href={ctaLink} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">Enter the Portal</a>
                <p className="text-blue-200/70 text-sm">The last card does not appear in public.</p>
              </div>
            </div>
          )}

          {cards.length === 0 && !alert && (
            <p className="text-blue-200/80">The oracle is awakened. The first card already vibrates between the veils.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReadingPanel
