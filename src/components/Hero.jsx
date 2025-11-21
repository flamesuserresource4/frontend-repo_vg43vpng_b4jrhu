import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/no-S8HKPA9ln9-NN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_5px_30px_rgba(147,197,253,0.25)]">
            Madame of the Moon
          </h1>
          <p className="mt-4 text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto">
            An ancient oracle whispers through symbols and shadowlight. Ask, and three cards will rise.
          </p>
          <p className="mt-1 text-sm md:text-base text-blue-200/75 italic">
            The fourth remains hidden… pulsing behind the veil.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
    </section>
  )
}

export default Hero
