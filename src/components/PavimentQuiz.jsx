import React, { useState, useRef } from 'react';
import { MessageCircle, CheckCircle2, Flame, Phone, ArrowRight } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';

const PRICE_PER_MQ = 30;

const sqmPresets = [
  { label: 'Bagno',          emoji: '\u{1F6BF}', value: 8   },
  { label: 'Camera',         emoji: '\u{1F6CF}\uFE0F', value: 15  },
  { label: 'Zona Giorno',    emoji: '\u{1F6CB}\uFE0F', value: 35  },
  { label: 'Appartamento',   emoji: '\u{1F3E0}', value: 70  },
  { label: 'Villa',          emoji: '\u{1F3E1}', value: 150 },
];

const buildingOptions = [
  { id: 'new',        label: 'Nuova costruzione',       emoji: '\u{1F3D7}\uFE0F' },
  { id: 'renovation', label: 'Ristrutturazione',        emoji: '\u{1F527}' },
  { id: 'unsure',     label: 'Non sono ancora sicuro',  emoji: '\u{1F914}' },
];

function calcPrice(sqm) {
  const low  = PRICE_PER_MQ * sqm;
  const high = Math.round(PRICE_PER_MQ * 1.6) * sqm;
  const fmt  = (n) => n.toLocaleString('it-IT');
  return { low: fmt(low), high: fmt(high) };
}

function PavimentQuiz() {
  const TOTAL_STEPS = 2;
  const [step, setStep] = useState(1);
  const [sqm, setSqm]   = useState(70);
  const [building, setBuilding] = useState(null);
  const quizRef = useRef(null);

  const scrollToTop = () => {
    if (quizRef.current) {
      const y = quizRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : '393342221212';
  const price = calcPrice(sqm);

  const whatsappUrl = () => {
    const lines = [
      'Ciao! Ho usato il configuratore sul vostro sito.',
      '',
      '*Riepilogo:*',
      'Superficie: circa ' + sqm + ' mq',
      'Tipo: ' + (building || '\u2014'),
      'Stima: \u20AC ' + price.low + ' \u2013 \u20AC ' + price.high,
      '',
      'Vorrei ricevere un preventivo dettagliato. Grazie!',
    ];
    return 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent(lines.join('\n'));
  };

  const progressPercent = (step / (TOTAL_STEPS + 1)) * 100;

  return (
    <section ref={quizRef} id="configuratore" className="bg-white py-10 md:py-16 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-3xl">

        <div className="bg-white rounded-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative">

          {/* Progress bar */}
          <div className="h-1 w-full bg-slate-100">
            <div
              className="h-full bg-orange-500 transition-all duration-500 ease-out rounded-r-full"
              style={{ width: progressPercent + '%' }}
            />
          </div>

          <div className="p-6 sm:p-8 md:p-12">

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-orange-600 text-[11px] font-bold uppercase tracking-widest mb-4">
                    <Flame className="w-3 h-3" />
                    Configuratore rapido
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Quanti mq vuoi<br className="hidden sm:block" /> riscaldare?
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg font-medium mt-3 max-w-lg mx-auto">
                    Seleziona il tipo di ambiente o usa lo slider per inserire i mq esatti.
                  </p>
                </div>

                {/* Big preset buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
                  {sqmPresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setSqm(p.value)}
                      className={
                        'flex flex-col items-center justify-center gap-1.5 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 ' +
                        (sqm === p.value
                          ? 'border-orange-500 bg-orange-50 shadow-md scale-[1.03]'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm')
                      }
                    >
                      <span className="text-2xl sm:text-3xl">{p.emoji}</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight text-center">{p.label}</span>
                      <span className={'text-[11px] font-semibold ' + (sqm === p.value ? 'text-orange-600' : 'text-slate-400')}>
                        ~{p.value} mq
                      </span>
                    </button>
                  ))}
                </div>

                {/* Slider card */}
                <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8 border border-slate-100">
                  <div className="flex items-end justify-between mb-5">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Superficie</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl md:text-6xl font-black text-orange-500 leading-none tabular-nums">{sqm}</span>
                      <span className="text-lg font-bold text-slate-400">mq</span>
                    </div>
                  </div>
                  <input
                    type="range" min={5} max={300} step={1}
                    value={sqm}
                    onChange={(e) => setSqm(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500
                      [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-[3px]
                      [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-grab
                      [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
                    <span>5 mq</span>
                    <span>300 mq</span>
                  </div>

                  {/* Live price preview */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">Stima da</span>
                    <span className="text-2xl md:text-3xl font-black text-slate-900">
                      &euro; {price.low} <span className="text-base font-bold text-slate-400">&ndash; {price.high}</span>
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => { setStep(2); setTimeout(scrollToTop, 80); }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 px-6 rounded-2xl font-black text-lg uppercase tracking-tight shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <span>Avanti</span>
                  <ArrowRight className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <button
                  onClick={() => { setStep(1); setTimeout(scrollToTop, 80); }}
                  className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors mb-6 uppercase tracking-wider"
                >
                  &larr; Indietro
                </button>

                {!building && (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                        Ultima cosa: che tipo di intervento?
                      </h2>
                      <p className="text-slate-500 font-medium">Cos&igrave; possiamo darti una stima pi&ugrave; precisa.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {buildingOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setBuilding(opt.label)}
                          className="group flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-slate-200 hover:border-orange-500 hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white"
                        >
                          <span className="text-3xl">{opt.emoji}</span>
                          <span className="font-bold text-sm text-slate-900 text-center group-hover:text-orange-600 transition-colors">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {building && (
                  <div>
                    {/* Success header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Tutto chiaro!</p>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Ecco la tua stima</h3>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 md:p-8 mb-8">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Superficie</span>
                          <span className="text-xl font-black text-slate-900">{sqm} mq</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Intervento</span>
                          <span className="text-xl font-black text-slate-900">{building}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Impianto</span>
                          <span className="text-xl font-black text-slate-900">Radiante Tradizionale</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Prezzo da</span>
                          <span className="text-xl font-black text-slate-900">&euro;{PRICE_PER_MQ}/mq</span>
                        </div>
                      </div>

                      <div className="border-t border-orange-200 pt-5">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Stima indicativa</span>
                        <p className="text-4xl sm:text-5xl font-black text-orange-600 leading-none">
                          &euro; {price.low} <span className="text-2xl font-bold text-orange-400">&ndash; {price.high}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-3 font-medium leading-relaxed">
                          * Include pannelli isolanti, tubazioni PE-Xa, collettore e manodopera. Massetto radiante e collegamento alla fonte di calore quotati a parte.
                        </p>
                      </div>
                    </div>

                    {/* Tip */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 flex gap-4 items-start">
                      <span className="text-2xl shrink-0">{'\u{1F4A1}'}</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm mb-1">
                          {building === 'Ristrutturazione'
                            ? 'In ristrutturazione possiamo valutare un sistema a basso spessore per ridurre i lavori.'
                            : 'Il sopralluogo gratuito ci permette di darti un preventivo esatto al centesimo, senza sorprese.'}
                        </p>
                        <p className="text-sm text-slate-500">Il preventivo finale &egrave; gratuito e senza impegno.</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <a
                        href={whatsappUrl()}
                        onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                        target="_blank" rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl font-black text-center uppercase tracking-tight shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2.5 text-base md:text-lg hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-5 h-5 shrink-0" />
                        Invia su WhatsApp
                      </a>
                      <a
                        href={'tel:' + cleanPhone}
                        onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-2xl font-black text-center uppercase tracking-tight shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2.5 text-base md:text-lg hover:-translate-y-0.5"
                      >
                        <Phone className="w-5 h-5 shrink-0" />
                        Chiama Ora
                      </a>
                    </div>

                    {/* Reassurance */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-slate-500 font-bold">
                      {['Sopralluogo Gratuito', 'Nessun Obbligo', 'Risposta in Giornata'].map((t) => (
                        <span key={t} className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => { setStep(1); setBuilding(null); setSqm(70); setTimeout(scrollToTop, 80); }}
                      className="w-full mt-6 text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider font-bold text-xs underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600"
                    >
                      Rifai il calcolo
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default PavimentQuiz;
