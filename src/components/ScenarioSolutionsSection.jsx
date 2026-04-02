import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';

const ScenarioSolutionsSection = () => {
    const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : '';

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-12 lg:px-24 max-w-5xl">

                {/* Header */}
                <div className="mb-14">
                    <p className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-4">
                        Perché scegliere noi
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-6">
                        Impianto 5 kWp in 2 giorni.<br />
                        <span className="text-yellow-600">Senza sorprese.</span>
                    </h2>
                </div>

                {/* Copy principale */}
                <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl">
                    <p className="text-xl md:text-2xl font-bold text-slate-900">
                        <span className="text-yellow-600">Vuoi il fotovoltaico ma hai paura del casino?</span> Preventivi confusi, 
                        aziende che spariscono dopo la firma, pratiche GSE che nessuno ti spiega, installatori 
                        in subappalto che non sai chi sono.
                    </p>

                    <p>
                        È quello che succede quando scegli il prezzo più basso senza guardare chi c'è dietro. 
                        Ti ritrovi con <span className="bg-red-50 px-1.5 py-0.5 text-red-700 font-bold rounded">pannelli montati male, 
                        infiltrazioni dal tetto, inverter sottodimensionati</span> e pratiche burocratiche 
                        bloccate per mesi. E quando chiami? Nessuno risponde.
                    </p>

                    <p>
                        Noi lavoriamo in modo diverso. <span className="font-bold text-slate-900">Ecosolution è un'impresa edile 
                        con squadre interne.</span> Non subappaltiamo niente. Chi fa il sopralluogo è lo stesso 
                        team che monta i pannelli, collega l'inverter e collauda l'impianto.
                    </p>

                    <p className="bg-yellow-50 border-l-4 border-yellow-400 px-5 py-4 rounded-r-xl text-slate-800 font-semibold">
                        Un unico referente dall'inizio alla fine. Pratiche GSE, Enel e detrazione fiscale 
                        incluse. Tu non devi fare niente — se non goderti il risparmio in bolletta.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-14 flex flex-col sm:flex-row gap-4 max-w-xl">
                    <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Ciao! Vorrei un preventivo per un impianto fotovoltaico. Potete aiutarmi?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                        className="flex-1 inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold uppercase tracking-tight px-8 py-5 rounded-2xl text-base md:text-lg transition-all shadow-[0_8px_0_0_rgba(25,118,65,0.8),0_16px_30px_-6px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_0_0_rgba(25,118,65,0.8),0_12px_20px_-4px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:translate-y-1"
                    >
                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                        Scrivici su WhatsApp
                    </a>
                    <a
                        href={`tel:${cleanPhone}`}
                        onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                        className="flex-1 inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold uppercase tracking-tight px-8 py-5 rounded-2xl text-base md:text-lg transition-all shadow-[0_8px_0_0_rgba(161,98,7,0.8),0_16px_30px_-6px_rgba(250,204,21,0.5)] hover:shadow-[0_4px_0_0_rgba(161,98,7,0.8),0_12px_20px_-4px_rgba(250,204,21,0.6)] hover:-translate-y-0.5 active:translate-y-1"
                    >
                        <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                        Chiama ora
                    </a>
                </div>

                {/* Reassurance */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-slate-500 font-bold">
                    {['Nessun obbligo', 'Risposta in giornata', '7 giorni su 7'].map((t) => (
                        <span key={t} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {t}
                        </span>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ScenarioSolutionsSection;
