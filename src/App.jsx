import Hero from './components/Hero'
import ReadingPanel from './components/ReadingPanel'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Hero />
      <ReadingPanel />
      <Footer />
    </div>
  )
}

export default App
