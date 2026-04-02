import { PHONE_NUMBER } from '../utils/constants';
import { Phone, Sun, Zap, ShieldCheck } from 'lucide-react';
import heroVideo from '../assets/video/herovideo.mp4';

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ── OVERLAY scuro con gradiente per leggibilità ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* ── CONTENUTO ── */}
      <div className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Pillola top */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sun className="w-4 h-4 text-yellow-300 flex-shrink-0" />
            Incentivi statali fino al 50% — Solo per il 2025
          </div>

          {/* H1 principale */}
          <h1 className="font-black tracking-tight leading-tight mb-6 text-white drop-shadow-lg">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Pannelli Solari
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1">
              Azzera la Tua{' '}
              <span className="text-yellow-400">Bolletta</span>
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl mt-4 font-semibold text-white/80">
              Installazione chiavi in mano a Milano e Lombardia
            </span>
          </h1>

          {/* 3 micro-badge di fiducia */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold">
              <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              Risparmio fino all'80%
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
              Garanzia 25 anni
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold">
              <Sun className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              200+ impianti installati
            </span>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              onClick={() => {
                if (typeof window.gtag_report_conversion === 'function') {
                  window.gtag_report_conversion();
                }
              }}
              className="
                group inline-flex items-center justify-center gap-3 w-full sm:w-auto
                bg-yellow-400 hover:bg-yellow-300
                px-8 py-5 rounded-2xl
                text-slate-900 font-extrabold uppercase tracking-tight
                transition-all duration-200
                shadow-[0_8px_0_0_rgba(161,98,7,0.8),0_16px_30px_-6px_rgba(250,204,21,0.5)]
                hover:shadow-[0_4px_0_0_rgba(161,98,7,0.8),0_12px_20px_-4px_rgba(250,204,21,0.6)]
                hover:-translate-y-0.5
                active:translate-y-1
                text-lg md:text-xl
              "
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
              <span>Preventivo Gratuito</span>
            </a>
          </div>

          {/* Micro-copy sotto CTA */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-5 text-xs md:text-sm text-white/60 font-medium">
            {['Nessun obbligo', 'Sopralluogo gratuito', 'Risposta entro 24h'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
