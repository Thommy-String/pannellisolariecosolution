import React from 'react';
import { MapPin } from 'lucide-react';

function ServiceAreasBadge() {
    return (
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                
                {/* Immagine Lombardia */}
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Flag_of_Lombardy_square.svg" 
                    alt="Lombardia" 
                    className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-sm rounded-sm"
                />
                
                {/* Testo */}
                <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 text-left tracking-widest leading-tight">
                        Installiamo impianti radianti ogni giorno 🇮🇹
                    </span>
                    <span className="text-sm md:text-base font-black text-slate-700 uppercase tracking-tight leading-tight">
                     Milano - Como - Varese - Monza
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ServiceAreasBadge;
