import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';
import video1 from '../assets/video/installazione1.mp4';
import video2 from '../assets/video/videoinstallazione2.mp4';

const steps = [
  {
    number: '1',
    title: 'Sopralluogo gratuito',
    subtitle: 'Veniamo noi da te, senza impegno',
    description: "Un nostro tecnico analizza il tetto, l'esposizione solare e i tuoi consumi reali. Ricevi un progetto su misura con il rendimento stimato — non numeri a caso.",
    details: [
      'Analisi tetto: inclinazione, orientamento, ombreggiature',
      'Lettura bollette per calcolare il fabbisogno reale',
      'Progetto personalizzato con simulazione di risparmio',
    ],
    duration: 'durata: 1 ora',
  },
  {
    number: '2',
    title: 'Installazione in 1-2 giorni',
    subtitle: 'Pensiamo a tutto noi, zero stress',
    description: "Le nostre squadre montano pannelli, inverter e batteria. Niente subappalti: i nostri tecnici fanno tutto. La tua casa resta vivibile durante i lavori.",
    details: [
      'Montaggio strutture e pannelli sul tetto',
      'Collegamento inverter e quadro elettrico',
      'Installazione batteria di accumulo (se prevista)',
    ],
    duration: 'durata: 1-2 giorni',
    video: video1,
  },
  {
    number: '3',
    title: 'Collaudo e attivazione',
    subtitle: 'Tu non devi fare niente',
    description: "Collaudiamo l'impianto e gestiamo tutte le pratiche con GSE ed Enel. Tu inizi a risparmiare, noi ci occupiamo della burocrazia.",
    details: [
      'Collaudo tecnico e test di produzione',
      'Pratica GSE per scambio sul posto',
      'Pratica Enel per contatore bidirezionale',
      'Documentazione per detrazione fiscale 50%',
    ],
    duration: 'durata: 15-30 gg (pratiche)',
    video: video2,
  },
];

function HowItWorks() {
  const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : '';

  const bgClasses = [
    'bg-slate-50',
    'bg-slate-100',
    'bg-white',
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-24 max-w-6xl pt-16 md:py-20">
        <p className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-4">
          Il processo
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-6">
          Dalla visita al<br />
          <span className="text-yellow-600">primo kWh prodotto.</span>
        </h2>
      </div>

      {steps.map((step, idx) => {
        const bgClass = bgClasses[idx];

        return (
          <div key={idx} className={`${bgClass} py-14 md:py-20 px-4 md:px-12 lg:px-24`}>
            <div className="max-w-6xl mx-auto flex flex-col gap-10 lg:gap-16 items-start">
              <div className={`flex-1 ${step.video ? 'w-full' : 'max-w-3xl'}`}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-6xl md:text-7xl font-black text-yellow-600 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-slate-200 max-w-[80px]" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-white/60 px-3 py-1.5 rounded-full border border-slate-200">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg font-medium text-slate-500 mb-5">
                  {step.subtitle}
                </p>

                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                  {step.description}
                </p>

                <ul className="space-y-3">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3 text-sm md:text-base">
                      <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {step.video && (
                <div className="w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] aspect-[16/9] max-w-4xl">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={step.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-12 lg:px-24 max-w-6xl">
          <div className="pt-12 border-t border-slate-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                  Pronto a partire?
                </h3>
                <p className="text-slate-500 text-base md:text-lg">
                  Il primo passo è il sopralluogo gratuito. Nessun obbligo.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold uppercase tracking-tight px-8 py-5 rounded-2xl text-base md:text-lg transition-all shadow-[0_8px_0_0_rgba(161,98,7,0.8),0_16px_30px_-6px_rgba(250,204,21,0.5)] hover:shadow-[0_4px_0_0_rgba(161,98,7,0.8),0_12px_20px_-4px_rgba(250,204,21,0.6)] hover:-translate-y-0.5 active:translate-y-1"
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                  Prenota sopralluogo
                </a>
                <a
                  href="#configuratore"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-600 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Calcola il risparmio
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
