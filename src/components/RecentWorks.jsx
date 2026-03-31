import React from 'react';
import riscaldamento1 from '../assets/images/riscaldamento1.jpg';
import riscaldamento2 from '../assets/images/riscaldamento2.jpg';
import riscaldamento3 from '../assets/images/riscaldamento3.jpg';
import riscaldamento4 from '../assets/images/riscaldamento4.jpg';
import riscaldamento5 from '../assets/images/riscaldamento5.jpg';
import riscaldamento6 from '../assets/images/riscaldamento6.jpg';

const works = [
    { id: 1, title: 'Radiante tradizionale',        sqm: 65,  time: '4 gg', location: 'Milano',            imageAfter: riscaldamento1, initials: 'MT' },
    { id: 2, title: 'Radiante + massetto',       sqm: 84,  time: '6 gg', location: 'Varese',            imageAfter: riscaldamento2, initials: 'GP' },
    { id: 3, title: 'Radiante tradizionale',   sqm: 88,  time: '3 gg', location: 'Como',              imageAfter: riscaldamento3, initials: 'RP' },
    { id: 4, title: 'Radiante appartamento',     sqm: 55,  time: '3 gg', location: 'Milano - San Siro', imageAfter: riscaldamento4, initials: 'LM' },
    { id: 5, title: 'Radiante + pompa calore',   sqm: 120, time: '5 gg', location: 'Varese - Centro',   imageAfter: riscaldamento5, initials: 'AC' },
    { id: 6, title: 'Radiante villa',            sqm: 180, time: '7 gg', location: 'Monza - Brianza',   imageAfter: riscaldamento6, initials: 'DB' },
];

const RecentWorks = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                
                {/* Titolo Stilizzato */}
                <div className="mb-12 max-w-4xl">
                    
                    <h2 className="text-3xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
                        Oltre <span className="text-orange-500">15.000 mq</span> di impianti radianti
                        <br/>
                        <span className="relative inline-block">
                            <span className="relative z-10">installati a regola d'arte</span>
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-400/30 -rotate-1 -z-0"></span>
                        </span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {works.map((work) => (
                        <div key={work.id} className="group relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                            <img 
                                src={work.imageAfter} 
                                alt={work.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Overlay Sfumato in alto per Leggibilità */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/30 to-transparent"></div>
                            
                            {/* Testi in alto */}
                            <div className="absolute top-0 left-0 right-0 p-3">
                                <h3 className="text-white font-black text-xs md:text-base leading-tight mb-2 drop-shadow-md truncate">
                                    {work.title}
                                </h3>
                                <div className="flex items-center gap-3 text-white/95 text-[11px] md:text-sm font-black leading-none">
                                    <span className="flex items-center gap-1.5 bg-blue-600/60 backdrop-blur-md px-2 py-1 rounded-lg">
                                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                        {work.sqm} mq
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-amber-600/60 backdrop-blur-md px-2 py-1 rounded-lg">
                                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {work.time}
                                    </span>
                                </div>
                            </div>

                            {/* Avatar, Stelle e Posizione in basso */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/90 to-transparent">
                                <div className="flex items-center gap-2">
                                    {/* Avatar con iniziali */}
                                    <div className="w-8 h-8 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 shrink-0">
                                        <span className="text-xs font-black text-white leading-none">
                                            {work.initials}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {/* Stelle */}
                                        <div className="flex items-center gap-0 mb-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        {/* Posizione */}
                                        <p className="text-white/80 text-[10px] font-bold truncate flex items-center gap-1">
                                            <svg className="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="none">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                            </svg>
                                            {work.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentWorks;