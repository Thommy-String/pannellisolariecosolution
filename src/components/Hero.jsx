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
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/45" />

      {/* ── CONTENUTO ── */}
      <div className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Pillola top */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sun className="w-4 h-4 text-yellow-300 flex-shrink-0" />
            Detrazione Fiscale fino al 50% — Bonus Casa 2026
          </div>

          {/* H1 principale */}
          <h1 className="font-black tracking-tight leading-tight mb-8 text-white drop-shadow-lg">
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Impianto Fotovoltaico 
            </span>
            <span className="block text-2xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
             
              <span className="text-yellow-400">100% Chiavi in Mano</span>
            </span>
          </h1>

          {/* Punti elenco con benefit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto text-left">
            {/* Card 1 - Energica con verde/giallo */}
            <div className="flex gap-3 items-start p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-yellow-400/5 backdrop-blur-sm border border-green-400/30 hover:border-green-400/60 transition-all hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)]">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-white font-semibold">Taglia le tue bollette fino al 90%</p>
                <p className="text-white/60 text-sm">Risparmio massimale garantito</p>
              </div>
            </div>

            {/* Card 2 - Serenità con azzurro */}
            <div className="flex gap-3 items-start p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-400/5 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/60 transition-all hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-white font-semibold">Diventa energeticamente indipendente</p>
                <p className="text-white/60 text-sm">Libera dalla dipendenza dei fornitori</p>
              </div>
            </div>

            
          </div>

          {/* Carta offerta elegante */}
          <div className="w-full max-w-2xl mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-400/40 backdrop-blur-md shadow-[0_8px_32px_-6px_rgba(250,204,21,0.3)]">
            <p className="text-yellow-300 text-sm font-semibold uppercase tracking-widest mb-2">Offerta 2026</p>
            <h2 className="text-white text-2xl md:text-4xl font-black mb-1">
              Kit 5kW da <span className="text-3xl text-yellow-400">6.990€</span>
              <span className="text-white/70 font-medium text-lg ml-3 line-through">11.500€</span>
            </h2>
            
            <div className="space-y-3 my-6">
              <div className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>11 Pannelli ad alto rendimento</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Inverter + Batteria di accumulo inclusi</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Installazione Inclusa nel prezzo</span>
              </div>
            </div>

            <p className="text-yellow-300 font-semibold text-sm">
              ✨ Ottieni il massimo dagli incentivi: sconto in fattura disponibile + Detrazione fino al 50%
            </p>
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
