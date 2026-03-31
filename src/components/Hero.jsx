import { PHONE_NUMBER } from '../utils/constants';
import ServiceAreasBadge from './ServiceAreasBadge';
import FloorHeatingExploder from './FloorHeatingExploder';
import { Phone, Flame } from 'lucide-react';
import riscaldamento1 from '../assets/images/riscaldamento1.jpg';
import riscaldamento2 from '../assets/images/riscaldamento2.jpg';
import riscaldamento3 from '../assets/images/riscaldamento3.jpg';

function Hero() {
  return (
    <section className="relative w-full bg-white flex items-center justify-center">
      <div className="w-full px-4 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center overflow-hidden">

          {/* Social proof stars */}
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-0">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-xs text-slate-400 font-medium italic">
              200+ impianti installati nel 2025
            </p>
          </div>

          {/* Badge regione */}
          <div className="mb-6">
            <ServiceAreasBadge />
          </div>

          {/* H1 */}
          <h1 className="font-black tracking-tight leading-relaxed mb-5 max-w-4xl">
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900">
              Riscaldamento a Pavimento{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-500">da soli €30/mq</span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-400/20 rounded-sm -rotate-1"></span>
              </span>
              {' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-400">Chiavi in Mano</span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-400/20 rounded-sm -rotate-1"></span>
              </span>
              {' '}
            </span>
          </h1>

          {/* 3 badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs md:text-sm font-semibold">
              <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              Prezzi di fabbrica
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs md:text-sm font-semibold">
              <svg className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Installazione certificata
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs md:text-sm font-semibold">
              <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              100% Chiavi in Mano
            </span>
          </div>

          {/* 3 Immagini Riscaldamento */}
          <div className="w-full grid grid-cols-3 gap-3 mb-4 max-w-4xl">
            {[riscaldamento1, riscaldamento2, riscaldamento3].map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/3]">
                <img
                  src={img}
                  alt={`Installazione riscaldamento a pavimento ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Brand partner logos — box uguale per tutti, colore originale */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-8 max-w-2xl w-full px-4">
            {[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/REHAU_Logo_sRGB_01.svg/1280px-REHAU_Logo_sRGB_01.svg.png', alt: 'Rehau' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Uponor-Logo.svg/1280px-Uponor-Logo.svg.png', alt: 'Uponor' },
              { src: 'https://logowik.com/content/uploads/images/roth1473.logowik.com.webp', alt: 'Roth' },
              { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwIs2p3lp94BrhVDxwkSH7XP0vSSSr3A729Q&s', alt: 'Giacomini' },
            ].map((brand) => (
              <div key={brand.alt} className="flex items-center justify-center h-10 md:h-12">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Floor Heating Exploder — isometric 3D animation */}
          <div className="w-full max-w-4xl mb-8">
            <FloorHeatingExploder />
          </div>

          {/* Google Review Card */}
          <div className="w-full max-w-2xl mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Recensione Google</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wide">Verificata</span>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 text-left">
                      <span className="text-slate-900 font-semibold">Impianto radiante installato in tutta la casa,</span> 95 mq in 5 giorni. Hanno gestito tutto: massetto, tubazioni, collaudo e regolazione zone. <span className="text-slate-900 font-semibold">Piacevole risultato in bolletta.</span> Professionalità top. Consiglio vivamente.
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border border-orange-300 shrink-0 flex items-center justify-center">
                          <span className="text-white font-bold text-xs leading-none">DP</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block leading-tight text-left">Danilo Proietti</span>
                          <span className="text-[11px] text-slate-400 font-medium">Milano - Porta Romana</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xl">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              onClick={() => {
                if (typeof window.gtag_report_conversion === 'function') {
                  window.gtag_report_conversion();
                }
              }}
              className="
                group relative inline-flex items-center justify-center gap-3 w-full
                bg-orange-500 hover:bg-orange-600
                px-8 py-5 rounded-2xl
                text-white font-extrabold uppercase tracking-tight
                transition-all duration-200
                shadow-[0_8px_0_0_rgba(194,65,12,1),0_16px_30px_-6px_rgba(249,115,22,0.45)]
                hover:shadow-[0_4px_0_0_rgba(194,65,12,1),0_12px_20px_-4px_rgba(249,115,22,0.5)]
                hover:-translate-y-0.5
                active:translate-y-1
                active:shadow-[0_2px_0_0_rgba(194,65,12,1)]
                text-lg md:text-xl
              "
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
              <span>Preventivo Gratuito</span>
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs md:text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Nessun Obbligo
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Sopralluogo Gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Tutti i giorni 7:00-20:00
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
