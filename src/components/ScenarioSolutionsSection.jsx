import React from 'react';
import { Camera, Phone } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';

const ScenarioSolutionsSection = () => {
    return (
        <section className="relative z-10 py-24 bg-slate-50 overflow-hidden w-screen -ml-[calc((100vw-100%)/2)]">
            <div className="w-full">
                <div className="w-full text-left">
                    {/* Header Principale */}
                    <div className="mb-16 px-8 md:px-12 lg:px-20">
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9]">
                            Non serve <span className="text-orange-500">impazzire</span> per un
                            <br/>
                            <span className="relative inline-block">
                                <span className="relative z-10">impianto radiante</span>
                                <span className="absolute bottom-2 left-0 w-full h-4 bg-orange-400/30 -rotate-1 -z-0"></span>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 space-y-8">
                        {/* Approfondimento Testuale a tutta larghezza */}
                        <div className="space-y-8 text-xl text-slate-600 leading-relaxed max-w-5xl text-left px-8 md:px-12 lg:px-20">
                            <p className="text-2xl font-bold text-slate-900">
                                <span className="text-orange-500">Riscalda la tua casa senza lo stress</span> di dover fare da "capocantiere" tra idraulici, elettricisti e muratori.
                                <br/><br/>
                                Quando decidi di installare il riscaldamento a pavimento, l'entusiasmo svanisce subito pensando al caos: <span className="bg-red-100 px-1 text-red-700 font-bold">settimane di cantiere, demolizioni ovunque, impianti idraulici da rifare, massetti da aspettare</span>, e l'ansia infinita di dover coordinare ditte diverse che spesso si danno la colpa a vicenda per i ritardi.
                                <br/><br/>
                                Noi abbiamo <span className="italic font-bold">cambiato le regole.</span> Essendo un'impresa edile completa, <span className="text-orange-500 font-bold">cancelliamo questo problema alla radice.</span> Dalla progettazione dell'impianto radiante alla posa dei pannelli isolanti, dai collettori alle tubazioni, dal massetto al collaudo finale — <span className="font-bold">le nostre squadre interne gestiscono l'intero processo.</span> Installiamo, collaudo, regoliamo le zone e consegniamo tutto funzionante.
                                <br/><br/>
                                <span className="bg-green-100 px-1 text-green-700 font-bold">Un unico referente, da €30/mq e la tua casa calda e pronta da vivere.</span>
                            </p>
                            
                            {/* CTA - WhatsApp con foto + Phone */}
                            <div className="mt-12 flex flex-col md:flex-row gap-4 relative max-w-3xl w-full">
                                <a
                                    href={`https://wa.me/39334222121212?text=${encodeURIComponent('Ciao! Vi contatto per un preventivo sul riscaldamento a pavimento. Vorrei installare un impianto radiante.')}`}
                                    onClick={() => {
                                        if (typeof window.gtag_report_conversion === 'function') {
                                            window.gtag_report_conversion();
                                        }
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group relative inline-flex flex-col items-center justify-center gap-1 flex-1
                                        bg-[#25D366] hover:bg-[#20bd5a]
                                        px-8 py-5 rounded-xl
                                        text-white font-black uppercase tracking-tighter
                                        transition-all duration-200
                                        shadow-[0_12px_0_0_rgba(0,0,0,0.3),0_20px_25px_-5px_rgba(37,211,102,0.4)]
                                        hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3),0_15px_20px_-5px_rgba(37,211,102,0.5)]
                                        hover:-translate-y-1
                                        active:translate-y-1
                                        active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)]
                                        border-none
                                        relative
                                    "
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Camera className="w-5 h-5" strokeWidth={2.5} />
                                        <span className="text-base md:text-lg tracking-[-0.07em]">Scrivici su WhatsApp</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-medium text-white/80 italic">
                                        Su WhatsApp
                                    </p>
                                </a>

                                <a
                                    href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                                    onClick={() => {
                                        if (typeof window.gtag_report_conversion === 'function') {
                                            window.gtag_report_conversion();
                                        }
                                    }}
                                    className="
                                        group relative inline-flex flex-col items-center justify-center gap-1 flex-1
                                        bg-orange-500 hover:bg-orange-600
                                        px-8 py-5 rounded-xl
                                        text-white font-black uppercase tracking-tighter
                                        transition-all duration-200
                                        shadow-[0_12px_0_0_rgba(194,65,12,1),0_20px_25px_-5px_rgba(249,115,22,0.4)]
                                        hover:shadow-[0_6px_0_0_rgba(194,65,12,1),0_15px_20px_-5px_rgba(249,115,22,0.5)]
                                        hover:-translate-y-1
                                        active:translate-y-1
                                        active:shadow-[0_2px_0_0_rgba(194,65,12,1)]
                                        border-none
                                        relative
                                    "
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Phone className="w-5 h-5" strokeWidth={2.5} />
                                        <span className="text-base md:text-lg tracking-[-0.07em]">Chiama ora</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-medium text-white/80 italic">
                                        Sopralluogo gratuito
                                    </p>
                                </a>
                            </div>

                            {/* Reassurance Section */}
                            <div className="mt-8 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-xs md:text-sm text-slate-600 font-bold border-t border-slate-200 pt-8">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    Nessun obbligo d'acquisto
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    Risposta in 2 ore
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    7 giorni su 7
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScenarioSolutionsSection;
