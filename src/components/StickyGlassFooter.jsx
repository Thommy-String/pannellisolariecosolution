import React, { useState, useEffect } from 'react';
import { PHONE_NUMBER } from '../utils/constants';

const StickyGlassFooter = ({ 
    subtitle = "Nessun obbligo di acquisto.", 
    buttonText = "Invia messaggio Whatsapp",
}) => {
    
    // Nascondi il footer finché il cookie banner è visibile
    const [cookieDismissed, setCookieDismissed] = useState(() => {
        return document.cookie.indexOf('gdpr_consent=') !== -1;
    });

    useEffect(() => {
        if (cookieDismissed) return;
        // Controlla se il cookie banner è stato chiuso — check meno aggressivo
        const interval = setInterval(() => {
            if (document.cookie.indexOf('gdpr_consent=') !== -1) {
                setCookieDismissed(true);
                clearInterval(interval);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [cookieDismissed]);

    // Rimuove spazi e simboli per il link api whatsapp (deve essere SOLO numeri)
    const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : "393342221212";

    const handleClick = () => {
        // Traccia la conversione Google Ads
        if (typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion();
        }

        const message = "Ciao vi contatto dal vostro sito per il riscaldamento a pavimento ...";
        const encodedMessage = encodeURIComponent(message);
        
        // Usa wa.me con il numero pulito (solo cifre)
        window.location.href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    };

    return (
        // Non renderizzare il footer se il cookie banner è ancora visibile
        // Evita sovrapposizione e conflitto di touch/click su mobile
        !cookieDismissed ? null :
        <div className="fixed bottom-0 left-0 right-0 z-[999] flex justify-center w-full pb-4 pointer-events-none px-3">
            {/* Card Container - Stile minimale "Apple" senza avatar */}
            <div className="relative w-full max-w-[400px] pointer-events-auto transition-transform hover:scale-[1.01] duration-300">
                
                {/* Sfondo Quasi Bianco / Vetro (Forzato Chiaro, rimosso dark mode) */}
                {/* Opacità ridotta a 70% per far intravedere sotto + blur aumentato */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[20px] backdrop-saturate-150 rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"></div>

                {/* Contenuto */}
                <div className="relative flex flex-col items-center justify-center px-4 py-3 gap-2">
                    
                    {/* Bottone Chiaro (White) Al Centro */}
                    <button 
                        onClick={handleClick}
                        className="
                            group relative inline-flex items-center justify-center gap-3
                            bg-white hover:bg-slate-50
                            px-8 py-4 rounded-xl
                            text-slate-900 font-black uppercase tracking-tighter text-lg md:text-xl
                            transition-all duration-200
                            shadow-[0_12px_0_0_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]
                            hover:shadow-[0_6px_0_0_rgba(0,0,0,0.1),0_15px_20px_-5px_rgba(0,0,0,0.15)]
                            hover:-translate-y-1
                            active:translate-y-1
                            active:shadow-none
                            border border-slate-200
                        "
                    >
                         {/* Icona WhatsApp Originale */}
                         <div className="p-1.5 bg-[#25D366]/20 rounded-lg group-hover:bg-[#25D366]/30 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.257-.154-2.874.854.854-2.874-.154-.257A8 8 0 1112 20z" fill="#25D366"/>
                            </svg>
                         </div>
                        {buttonText}
                    </button>

                    {/* Sottotitolo Sotto */}
                    <div className="flex items-center gap-1.5 opacity-80">
                         <span className="relative flex h-2 w-2">
                        </span>
                        <p className="text-[11px] font-medium text-slate-600 leading-none">
                            {subtitle}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StickyGlassFooter;
