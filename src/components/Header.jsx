import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_NAME, PHONE_NUMBER } from '../utils/constants';
import logoImage from '../assets/logo/eco-solutions-logo-.jpeg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Modifica: Header sempre visibile, ma non sticky (position: absolute)
  const location = useLocation();

  // 1. Chiudi il menu quando cambia la rotta (opzionale se singola pagina)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <style>
        {`
          .header-nav {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
          }
        `}
      </style>

      <header className="header-nav bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 md:h-24">
            
            {/* Logo e Info Aziendali - Espanso */}
            <div className="flex items-center gap-4 md:gap-6 w-full">
              <Link to="/" className="flex-shrink-0 group">
                <img 
                  src={logoImage} 
                  alt={COMPANY_NAME} 
                  className="h-14 w-14 md:h-20 md:w-20 object-contain rounded-2xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform"
                />
              </Link>
              <div className="flex flex-col border-l-2 border-slate-200 pl-4 md:pl-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-md md:text-xl font-black text-slate-900 leading-none tracking-tighter uppercase">
                    Ecosolution s.a.s.
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-widest">
                    Ditta Edile
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1">
                  <span className="text-[10px] md:text-sm font-medium text-slate-600 uppercase tracking-widest">
                    Ditta Edile - riscaldamento a pavimento
                  </span>
                  <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                  {/* Phone CTA - Responsive */}
                  <a 
                    href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                    onClick={() => {
                        if (typeof window.gtag_report_conversion === 'function') {
                            window.gtag_report_conversion();
                        }
                    }}
                    className="flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-800 transition-colors duration-200 group underline"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-xs md:text-sm">{PHONE_NUMBER}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
