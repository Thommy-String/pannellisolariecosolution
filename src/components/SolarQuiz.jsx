import React, { useState, useRef } from 'react';
import { MessageCircle, CheckCircle2, Sun, Phone, ArrowRight, Zap, BatteryCharging, PiggyBank, TrendingDown } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';

/* ─── Costanti di calcolo realistiche 2026 Italia ─── */
const ELECTRICITY_PRICE_KWH = 0.28;          // €/kWh PUN medio
const AVG_SUN_HOURS_YEAR = 1350;              // ore solari equiv. Lombardia
const PANEL_WATT = 455;                       // Wp pannello singolo
const SELF_CONSUMPTION_NO_BATTERY = 0.35;     // autoconsumo senza batteria
const SELF_CONSUMPTION_WITH_BATTERY = 0.80;   // autoconsumo con batteria
const SSP_PRICE = 0.10;                       // €/kWh scambio sul posto
const DEGRADATION_YEAR = 0.005;               // 0.5% degradazione annuale
const DETRACTION_RATE = 0.50;                 // detrazione fiscale 50%
const DETRACTION_YEARS = 10;                  // in 10 anni

/* Step 1: Tipo di casa → stima automatica bolletta */
const homeTypes = [
  { id: 'apartment',  label: 'Appartamento',       desc: '2-3 locali, consumi medi',       icon: '🏢', defaultBill: 60,  roofDefault: 'flat'    },
  { id: 'townhouse',  label: 'Villetta a schiera',  desc: 'Con tetto proprio, famiglia',    icon: '🏘️', defaultBill: 110, roofDefault: 'pitched' },
  { id: 'detached',   label: 'Villa indipendente',  desc: 'Casa singola, consumi alti',     icon: '🏡', defaultBill: 180, roofDefault: 'pitched' },
  { id: 'farmhouse',  label: 'Cascina / Rustico',   desc: 'Grande metratura, elettrodomestici', icon: '🏚️', defaultBill: 280, roofDefault: 'pitched' },
  { id: 'business',   label: 'Attività commerciale',desc: 'Negozio, ufficio, capannone',    icon: '🏪', defaultBill: 400, roofDefault: 'flat'    },
];

const roofOptions = [
  { id: 'pitched',  label: 'Tetto a falda',     desc: 'Tegole o lamiera inclinata',   icon: '🏠', costMultiplier: 1.0  },
  { id: 'flat',     label: 'Tetto piano',        desc: 'Terrazzo o lastrico solare',   icon: '🏢', costMultiplier: 1.08 },
  { id: 'ground',   label: 'Installazione a terra', desc: 'Giardino o terreno aperto', icon: '🌿', costMultiplier: 1.05 },
];

const batteryOptions = [
  { id: 'yes', label: 'Sì, con batteria',   desc: 'Massimo risparmio: accumuli e usi di notte', color: 'green' },
  { id: 'no',  label: 'No, senza batteria',  desc: 'Investimento più basso, scambio sul posto',  color: 'blue'  },
];

/* ─── Funzioni di calcolo ─── */
function annualConsumption(monthlyBill) {
  // bolletta mensile / prezzo kWh * 12
  return Math.round((monthlyBill / ELECTRICITY_PRICE_KWH) * 12);
}

function recommendedKw(kWhYear) {
  // Per coprire ~100% del fabbisogno: kWhYear / ore sole
  const raw = kWhYear / AVG_SUN_HOURS_YEAR;
  // Arrotonda al 0.5 kW superiore, min 3 kW
  return Math.max(3, Math.ceil(raw * 2) / 2);
}

function panelCount(kwp) {
  return Math.ceil((kwp * 1000) / PANEL_WATT);
}

function systemCost(kwp, roofMultiplier, withBattery) {
  // Prezzo base €/kW (decrescente per impianti più grandi)
  let pricePerKw;
  if (kwp <= 3)       pricePerKw = 1900;
  else if (kwp <= 6)  pricePerKw = 1700;
  else if (kwp <= 10) pricePerKw = 1500;
  else                pricePerKw = 1350;

  let baseCost = Math.round(kwp * pricePerKw * roofMultiplier);

  // Batteria: ~€400/kWh, dimensionamento ~60% della taglia kWp
  let batteryCost = 0;
  let batteryKwh = 0;
  if (withBattery) {
    batteryKwh = Math.max(5, Math.round(kwp * 0.6 * 2) / 2); // min 5 kWh
    batteryCost = Math.round(batteryKwh * 400);
  }

  return {
    baseCost,
    batteryCost,
    batteryKwh,
    totalCost: baseCost + batteryCost,
  };
}

function annualSavings(kwp, kWhYear, withBattery) {
  const production = Math.round(kwp * AVG_SUN_HOURS_YEAR);
  const selfConsRate = withBattery ? SELF_CONSUMPTION_WITH_BATTERY : SELF_CONSUMPTION_NO_BATTERY;

  const selfConsumedKwh = Math.min(Math.round(production * selfConsRate), kWhYear);
  const exportedKwh = production - selfConsumedKwh;

  const savingsFromSelfConsumption = selfConsumedKwh * ELECTRICITY_PRICE_KWH;
  const revenueFromExport = exportedKwh * SSP_PRICE;

  return {
    production,
    selfConsumedKwh,
    exportedKwh,
    savingsFromSelfConsumption: Math.round(savingsFromSelfConsumption),
    revenueFromExport: Math.round(revenueFromExport),
    totalAnnualSaving: Math.round(savingsFromSelfConsumption + revenueFromExport),
  };
}

function paybackYears(totalCost, annualSaving) {
  const netCost = totalCost * (1 - DETRACTION_RATE); // dopo detrazione
  if (annualSaving <= 0) return 99;
  return Math.round((netCost / annualSaving) * 10) / 10;
}

/* ─── Componente ─── */
function SolarQuiz() {
  const TOTAL_STEPS = 4;
  const [step, setStep] = useState(1);
  const [homeType, setHomeType] = useState(null);
  const [monthlyBill, setMonthlyBill] = useState(120);
  const [roof, setRoof] = useState(null);
  const [battery, setBattery] = useState(null);
  const quizRef = useRef(null);

  const scrollToTop = () => {
    if (quizRef.current) {
      const y = quizRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : '393342221212';

  // Calcoli derivati
  const kWhYear = annualConsumption(monthlyBill);
  const kwp = recommendedKw(kWhYear);
  const panels = panelCount(kwp);
  const roofData = roofOptions.find(r => r.id === roof) || roofOptions[0];
  const withBattery = battery === 'yes';
  const cost = systemCost(kwp, roofData.costMultiplier, withBattery);
  const savings = annualSavings(kwp, kWhYear, withBattery);
  const payback = paybackYears(cost.totalCost, savings.totalAnnualSaving);
  const savingsIn25Years = Math.round(savings.totalAnnualSaving * 25 * (1 - DEGRADATION_YEAR * 12.5)); // media degradazione
  const detractionAnnual = Math.round((cost.totalCost * DETRACTION_RATE) / DETRACTION_YEARS);

  const fmt = (n) => n.toLocaleString('it-IT');

  const whatsappUrl = () => {
    const homeData = homeTypes.find(h => h.id === homeType);
    const lines = [
      'Ciao! Ho usato il configuratore fotovoltaico sul vostro sito.',
      '',
      '*Riepilogo:*',
      `Tipo casa: ${homeData ? homeData.label : '—'}`,
      `Bolletta mensile: €${monthlyBill}`,
      `Consumo stimato: ${fmt(kWhYear)} kWh/anno`,
      `Impianto consigliato: ${kwp} kWp (${panels} pannelli)`,
      `Tetto: ${roofData.label}`,
      `Batteria: ${withBattery ? `Sì (${cost.batteryKwh} kWh)` : 'No'}`,
      `Investimento stimato: €${fmt(cost.totalCost)}`,
      `Risparmio annuo: €${fmt(savings.totalAnnualSaving)}`,
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
              className="h-full bg-yellow-400 transition-all duration-500 ease-out rounded-r-full"
              style={{ width: progressPercent + '%' }}
            />
          </div>

          <div className="p-6 sm:p-8 md:p-12">

            {/* ════════════ STEP 1 — Tipo di casa ════════════ */}
            {step === 1 && (
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-[11px] font-bold uppercase tracking-widest mb-4">
                    <Sun className="w-3 h-3" />
                    Scopri quanto puoi risparmiare
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Che tipo di casa<br className="hidden sm:block" /> vuoi rendere solare?
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg font-medium mt-3 max-w-lg mx-auto">
                    Bastano 30 secondi per scoprire il tuo risparmio reale.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {homeTypes.map((home) => (
                    <button
                      key={home.id}
                      onClick={() => {
                        setHomeType(home.id);
                        setMonthlyBill(home.defaultBill);
                        setRoof(home.roofDefault);
                        setStep(2);
                        setTimeout(scrollToTop, 80);
                      }}
                      className="group flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-slate-200 hover:border-yellow-400 hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white"
                    >
                      <span className="text-3xl sm:text-4xl">{home.icon}</span>
                      <span className="font-bold text-sm text-slate-900 text-center group-hover:text-yellow-600 transition-colors">
                        {home.label}
                      </span>
                      <span className="text-xs text-slate-400 text-center">{home.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ════════════ STEP 2 — Affina la bolletta ════════════ */}
            {step === 2 && (
              <div>
                <button
                  onClick={() => { setStep(1); setTimeout(scrollToTop, 80); }}
                  className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors mb-6 uppercase tracking-wider"
                >
                  &larr; Indietro
                </button>

                <div className="text-center mb-8">
                  <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 2 di {TOTAL_STEPS}</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    Quanto paghi di luce<br className="hidden sm:block" /> al mese, più o meno?
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg font-medium mt-3 max-w-lg mx-auto">
                    Muovi lo slider — anche un valore approssimativo va benissimo.
                  </p>
                </div>

                {/* Slider card */}
                <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8 border border-slate-100">
                  <div className="flex items-end justify-between mb-5">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Bolletta mensile</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl md:text-6xl font-black text-yellow-500 leading-none tabular-nums">€{monthlyBill}</span>
                      <span className="text-lg font-bold text-slate-400">/mese</span>
                    </div>
                  </div>
                  <input
                    type="range" min={30} max={500} step={5}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400
                      [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-[3px]
                      [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-grab
                      [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-yellow-400 [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
                    <span>€30</span>
                    <span>€500</span>
                  </div>

                  {/* Live consumption preview */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">Consumo annuo stimato</span>
                    <span className="text-2xl md:text-3xl font-black text-slate-900">
                      {fmt(kWhYear)} <span className="text-base font-bold text-slate-400">kWh</span>
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => { setStep(3); setTimeout(scrollToTop, 80); }}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 py-5 px-6 rounded-2xl font-black text-lg uppercase tracking-tight shadow-[0_8px_0_0_rgba(161,98,7,0.8),0_16px_30px_-6px_rgba(250,204,21,0.5)] hover:shadow-[0_4px_0_0_rgba(161,98,7,0.8),0_12px_20px_-4px_rgba(250,204,21,0.6)] transition-all hover:-translate-y-0.5 active:translate-y-1 flex items-center justify-center gap-3"
                >
                  <span>Avanti</span>
                  <ArrowRight className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
            )}

            {/* ════════════ STEP 3 — Tipo di tetto ════════════ */}
            {step === 3 && (
              <div>
                <button
                  onClick={() => { setStep(2); setTimeout(scrollToTop, 80); }}
                  className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors mb-6 uppercase tracking-wider"
                >
                  &larr; Indietro
                </button>

                <div className="text-center mb-8">
                  <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 3 di {TOTAL_STEPS}</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                    Dove installiamo i pannelli?
                  </h2>
                  <p className="text-slate-500 font-medium">Il tipo di copertura influisce sul metodo di montaggio.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {roofOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setRoof(opt.id); setStep(4); setTimeout(scrollToTop, 80); }}
                      className="group flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-slate-200 hover:border-yellow-400 hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white"
                    >
                      <span className="text-3xl">{opt.icon}</span>
                      <span className="font-bold text-sm text-slate-900 text-center group-hover:text-yellow-600 transition-colors">
                        {opt.label}
                      </span>
                      <span className="text-xs text-slate-400 text-center">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ════════════ STEP 4 — Batteria ════════════ */}
            {step === 4 && (
              <div>
                <button
                  onClick={() => { setStep(3); setTimeout(scrollToTop, 80); }}
                  className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors mb-6 uppercase tracking-wider"
                >
                  &larr; Indietro
                </button>

                <div className="text-center mb-8">
                  <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 4 di {TOTAL_STEPS}</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                    Vuoi usare il sole<br className="hidden sm:block" /> anche di notte?
                  </h2>
                  <p className="text-slate-500 font-medium">Con una batteria di accumulo sfrutti l'energia anche dopo il tramonto.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {batteryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setBattery(opt.id); setStep(5); setTimeout(scrollToTop, 80); }}
                      className={`group flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white ${
                        opt.color === 'green' ? 'hover:border-green-400' : 'hover:border-blue-400'
                      }`}
                    >
                      <BatteryCharging className={`w-8 h-8 ${opt.color === 'green' ? 'text-green-500 group-hover:text-green-600' : 'text-blue-500 group-hover:text-blue-600'} transition-colors`} />
                      <span className={`font-bold text-lg text-slate-900 text-center ${
                        opt.color === 'green' ? 'group-hover:text-green-600' : 'group-hover:text-blue-600'
                      } transition-colors`}>
                        {opt.label}
                      </span>
                      <span className="text-sm text-slate-400 text-center">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ════════════ STEP 5 — RISULTATO ════════════ */}
            {step === 5 && battery && (
              <div>
                {/* Success header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Analisi completata</p>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Il tuo impianto ideale</h3>
                  </div>
                </div>

                {/* Riepilogo tecnico */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 md:p-8 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Taglia</span>
                      <span className="text-xl font-black text-slate-900">{kwp} kWp</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Pannelli</span>
                      <span className="text-xl font-black text-slate-900">{panels} moduli</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Tetto</span>
                      <span className="text-xl font-black text-slate-900">{roofData.label}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Batteria</span>
                      <span className="text-xl font-black text-slate-900">{withBattery ? `${cost.batteryKwh} kWh` : 'No'}</span>
                    </div>
                  </div>

                  <div className="border-t border-yellow-200 pt-5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Investimento stimato</span>
                    <p className="text-4xl sm:text-5xl font-black text-yellow-600 leading-none">
                      €{fmt(cost.totalCost)}
                    </p>
                    {withBattery && (
                      <p className="text-sm text-slate-600 mt-2 font-medium">
                        Impianto €{fmt(cost.baseCost)} + Batteria {cost.batteryKwh} kWh €{fmt(cost.batteryCost)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Risparmio e ROI — Card con spiegazione dettagliata */}
                <div className="space-y-5 mb-6">

                  {/* CARD 1: Risparmio annuo */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl overflow-hidden">
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                          <PiggyBank className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest block">Risparmio annuo</span>
                          <span className="text-3xl md:text-4xl font-black text-green-700 leading-tight">€{fmt(savings.totalAnnualSaving)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <div className="bg-white/70 rounded-xl p-4 space-y-3">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          <strong className="text-slate-900">Cosa significa?</strong> Ogni anno risparmi <strong className="text-green-700">€{fmt(savings.totalAnnualSaving)}</strong> rispetto a oggi. Sono circa <strong className="text-green-700">€{fmt(Math.round(savings.totalAnnualSaving / 12))}/mese</strong> in meno sulla tua bolletta.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 bg-green-50 rounded-lg p-3 border border-green-100">
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block mb-0.5">Autoconsumo diretto</span>
                            <span className="text-lg font-black text-green-700">€{fmt(savings.savingsFromSelfConsumption)}</span>
                            <p className="text-xs text-slate-500 mt-0.5">Energia che usi subito dai pannelli, senza comprarla dal fornitore</p>
                          </div>
                          <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">Scambio sul posto (SSP)</span>
                            <span className="text-lg font-black text-blue-700">€{fmt(savings.revenueFromExport)}</span>
                            <p className="text-xs text-slate-500 mt-0.5">Energia in eccesso che cedi alla rete e ti viene rimborsata dal GSE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: Rientro investimento */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl overflow-hidden">
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                          <TrendingDown className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">Rientro investimento</span>
                          <span className="text-3xl md:text-4xl font-black text-blue-700 leading-tight">~{payback} anni</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <div className="bg-white/70 rounded-xl p-4 space-y-3">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          <strong className="text-slate-900">Come funziona?</strong> Investi <strong>€{fmt(cost.totalCost)}</strong>, ma lo Stato ti restituisce il <strong className="text-blue-700">50%</strong> in detrazioni fiscali in {DETRACTION_YEARS} anni. Significa che ogni anno recuperi <strong className="text-blue-700">€{fmt(detractionAnnual)}</strong> dalle tasse.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">Costo reale (dopo detrazione)</span>
                            <span className="text-lg font-black text-blue-700">€{fmt(Math.round(cost.totalCost * (1 - DETRACTION_RATE)))}</span>
                            <p className="text-xs text-slate-500 mt-0.5">Paghi €{fmt(cost.totalCost)} ma ne recuperi €{fmt(Math.round(cost.totalCost * DETRACTION_RATE))} in {DETRACTION_YEARS} anni</p>
                          </div>
                          <div className="flex-1 bg-green-50 rounded-lg p-3 border border-green-100">
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block mb-0.5">Dopo il rientro</span>
                            <span className="text-lg font-black text-green-700">{Math.round(25 - payback)}+ anni gratis</span>
                            <p className="text-xs text-slate-500 mt-0.5">Energia a costo zero per tutti gli anni restanti di garanzia</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: Guadagno in 25 anni */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl overflow-hidden">
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                          <Zap className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-yellow-600 uppercase tracking-widest block">Guadagno in 25 anni</span>
                          <span className="text-3xl md:text-4xl font-black text-yellow-700 leading-tight">€{fmt(savingsIn25Years)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <div className="bg-white/70 rounded-xl p-4 space-y-3">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          <strong className="text-slate-900">Il quadro completo.</strong> In 25 anni il tuo impianto produce circa <strong className="text-yellow-700">{fmt(savings.production * 25)} kWh</strong> di energia. Sottraendo l'investimento iniziale, il tuo guadagno netto è di <strong className="text-yellow-700">€{fmt(savingsIn25Years - cost.totalCost)}</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                            <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider block mb-0.5">Produzione annua</span>
                            <span className="text-lg font-black text-yellow-700">{fmt(savings.production)} kWh</span>
                            <p className="text-xs text-slate-500 mt-0.5">I tuoi {panels} pannelli convertono la luce del sole in corrente elettrica</p>
                          </div>
                          <div className="flex-1 bg-amber-50 rounded-lg p-3 border border-amber-100">
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-0.5">Ritorno sull'investimento</span>
                            <span className="text-lg font-black text-amber-700">{fmt(Math.round((savingsIn25Years / cost.totalCost) * 100))}%</span>
                            <p className="text-xs text-slate-500 mt-0.5">Per ogni €1 investito ne guadagni €{(savingsIn25Years / cost.totalCost).toFixed(1)} in 25 anni</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Cosa è incluso */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
                  <h4 className="font-black text-lg text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Cosa è incluso nel prezzo
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { t: `${panels} Pannelli da ${PANEL_WATT}Wp`, d: 'Moduli monocristallini ad alto rendimento' },
                      { t: 'Inverter ibrido', d: 'Conversione e gestione intelligente' },
                      ...(withBattery ? [{ t: `Batteria ${cost.batteryKwh} kWh`, d: 'Accumulo LFP lunga durata' }] : []),
                      { t: 'Strutture di fissaggio', d: 'Staffe e profili in alluminio' },
                      { t: 'Installazione certificata', d: 'Tecnici qualificati e collaudo' },
                      { t: 'Pratiche GSE e Enel', d: 'Allaccio, scambio sul posto, detrazione' },
                      { t: 'Garanzia 25 anni', d: 'Sui pannelli, 10 anni inverter' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.t}</p>
                          <p className="text-xs text-slate-500">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 flex gap-4 items-start">
                  <span className="text-2xl shrink-0">💡</span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm mb-1">
                      {withBattery
                        ? `Con la batteria da ${cost.batteryKwh} kWh copri fino all'80% del tuo fabbisogno, anche la sera.`
                        : 'Aggiungendo una batteria in futuro puoi portare l\'autoconsumo dal 35% all\'80%.'}
                    </p>
                    <p className="text-sm text-slate-500">Il sopralluogo gratuito ci permette di confermare la fattibilità e darti un preventivo definitivo.</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <a
                    href={whatsappUrl()}
                    onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-5 px-6 rounded-2xl font-black text-center uppercase tracking-tight transition-all flex justify-center items-center gap-2.5 text-base md:text-lg shadow-[0_8px_0_0_rgba(25,118,65,0.8),0_16px_30px_-6px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_0_0_rgba(25,118,65,0.8),0_12px_20px_-4px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    Invia su WhatsApp
                  </a>
                  <a
                    href={'tel:' + cleanPhone}
                    onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 py-5 px-6 rounded-2xl font-black text-center uppercase tracking-tight transition-all flex justify-center items-center gap-2.5 text-base md:text-lg shadow-[0_8px_0_0_rgba(161,98,7,0.8),0_16px_30px_-6px_rgba(250,204,21,0.5)] hover:shadow-[0_4px_0_0_rgba(161,98,7,0.8),0_12px_20px_-4px_rgba(250,204,21,0.6)] hover:-translate-y-0.5 active:translate-y-1"
                  >
                    <Phone className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    Chiama Ora
                  </a>
                </div>

                {/* Reassurance */}
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-slate-500 font-bold">
                  {['Sopralluogo Gratuito', 'Nessun Obbligo', 'Risposta in Giornata'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => { setStep(1); setBattery(null); setRoof(null); setHomeType(null); setMonthlyBill(120); setTimeout(scrollToTop, 80); }}
                  className="w-full mt-6 text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider font-bold text-xs underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600"
                >
                  Rifai il calcolo
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default SolarQuiz;
