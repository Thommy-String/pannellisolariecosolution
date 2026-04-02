import React from 'react';
import { TrendingDown, Zap, Leaf, Heart, AlertCircle, Clock, Euro } from 'lucide-react';

function SolarBenefitsSection() {
  const benefits = [
    {
      icon: TrendingDown,
      title: 'Bolletta più bassa',
      bullets: ['Risparmi fino al 90% in bolletta'],
      description: 'Produci la tua energia quando il sole splende. Meno corrente da pagare al fornitore = bolletta dimezzata o quasi azzerata.',
      color: 'green',
    },
    {
      icon: Zap,
      title: 'Sei il tuo fornitore',
      bullets: ['Produci la tua energia', 'Non dipendi dai rincari'],
      description: 'Con i pannelli solari diventi produttore di energia. Non paghi più i rincari dei gestori: controlli il prezzo da solo.',
      color: 'yellow',
    },
    {
      icon: Euro,
      title: 'Valore della casa più alto',
      bullets: ['Vale il 3-4% in più', 'Si vende più facilmente'],
      description: 'Una casa con pannelli solari vale di più sul mercato. I compratori pagano extra per l\'efficienza energetica e i risparmi garantiti.',
      color: 'green',
    },
    {
      icon: Heart,
      title: 'Aiuti il pianeta',
      bullets: ['50 tonnellate CO₂ risparmiata', 'In 25 anni di pannelli'],
      description: 'Ogni kWh che produci dai pannelli è energia pulita. In 25 anni eviti 50 tonnellate di CO₂: è come piantare 2000 alberi.',
      color: 'blue',
    },
    {
      icon: Clock,
      title: 'Ti ripaghi veloce',
      bullets: ['6-8 anni con gli incentivi', 'Poi guadagni per 17+ anni'],
      description: 'Con i benefici fiscali 2026 (50% detraibile), il tuo impianto si ripaga in 6-8 anni. Dopo? L\'energia è gratis per almeno 17 anni.',
      color: 'yellow',
    },
    {
      icon: AlertCircle,
      title: 'Garantito per 25 anni',
      bullets: ['Zero problemi', 'Tranquillità assicurata'],
      description: 'I pannelli hanno garanzia 25 anni e perdono solo il 20% di efficienza dopo 25 anni.',
      color: 'blue',
    },
  ];

  const colorMap = {
    green: {
      bg: 'from-green-500/20 to-emerald-500/5',
      border: 'border-green-400/30',
      icon: 'text-green-400',
      hover: 'hover:border-green-400/60 hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.4)]',
    },
    yellow: {
      bg: 'from-yellow-500/20 to-amber-400/5',
      border: 'border-yellow-400/30',
      icon: 'text-yellow-400',
      hover: 'hover:border-yellow-400/60 hover:shadow-[0_0_25px_-5px_rgba(250,204,21,0.4)]',
    },
    blue: {
      bg: 'from-blue-500/20 to-cyan-400/5',
      border: 'border-blue-400/30',
      icon: 'text-blue-400',
      hover: 'hover:border-blue-400/60 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)]',
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/* Sfondo statico con mesh gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_0%,rgba(34,197,94,0.15),transparent),radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(250,204,21,0.12),transparent),radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(59,130,246,0.08),transparent)]" />

      {/* Contenuto */}
      <div className="relative z-10 py-20 md:py-32 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header section */}
          <div className="mb-16 md:mb-24 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-xs md:text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Perché scegliere il fotovoltaico
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
              <span className="text-yellow-400">Diventa indipendente</span> <br className="hidden sm:block" />
              <span className="text-white">dall'energia del fornitore</span>
            </h2>

           
          </div>

          {/* Griglia benefici */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, idx) => {
              const colors = colorMap[benefit.color];
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className={`
                    group p-6 md:p-7 rounded-2xl
                    bg-gradient-to-br ${colors.bg}
                    border-2 ${colors.border}
                    backdrop-blur-sm
                    transition-all duration-300
                    ${colors.hover}
                    cursor-pointer
                  `}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-black text-lg md:text-xl mb-3 group-hover:text-yellow-300 transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-4">
                    {benefit.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-white/75 text-sm md:text-base flex items-start gap-2 group-hover:text-white transition-colors">
                        <span className="text-yellow-300 font-bold mt-0.5">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>


          
        </div>
      </div>
    </section>
  );
}

export default SolarBenefitsSection;
