import React from 'react';
import operaiImage from '../assets/images/operaiofotovoltaico.jpg';

const works = [
    {
      id: 1,
      title: 'Fotovoltaico 6 kWp',
      kwp: '6 kWp',
      time: '1 giorno',
      location: 'Milano',
      image: 'https://quifinanza.it/wp-content/uploads/sites/5/2023/12/energia-casa-tetti-fotovoltaico-italia.jpg',
      initials: 'MT',
    },
    {
      id: 2,
      title: 'Impianto 4.5 kWp + Batteria',
      kwp: '4.5 kWp',
      time: '2 giorni',
      location: 'Padova',
      image: 'https://tspower.eu/wp-content/uploads/2025/03/pannelli-fotovoltaici-portogruaro-padova.png',
      initials: 'GP',
    },
    {
      id: 3,
      title: 'Fotovoltaico 8 kWp',
      kwp: '8 kWp',
      time: '2 giorni',
      location: 'Gorizia',
      image: 'https://www.domovip-europa.it/wp-content/uploads/2026/02/dettaglio-impianto-fotovoltaico-moraro-gorizia.webp',
      initials: 'RP',
    },
    {
      id: 4,
      title: 'Impianto 5 kWp Residenziale',
      kwp: '5 kWp',
      time: '1 giorno',
      location: 'Varese',
      image: 'https://www.generalcover.it/wp-content/uploads/2024/10/Linea-vita-obbligatoria-per-fotovoltaico-e.jpg',
      initials: 'LM',
    },
    {
      id: 5,
      title: 'Fotovoltaico 10 kWp Villa',
      kwp: '10 kWp',
      time: '2 giorni',
      location: 'Como',
      image: 'https://www.manseametal.com/cm/dpl/images/articles/67/solar_panel_on_metal_roofs.jpg',
      initials: 'AC',
    },
    {
      id: 6,
      title: 'Impianto 6.5 kWp + Accumulo',
      kwp: '6.5 kWp',
      time: '2 giorni',
      location: 'Monza',
      image: 'https://www.benacoenergia.it/wp-content/uploads/2020/01/Fotovoltaico-dimensionamento4-1600x1103.jpg',
      initials: 'DB',
    },
];

const RecentWorks = () => {
    return (
        <>
            <section className="relative w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={operaiImage}
                        alt="217+ Installazioni Ecosolution"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {/* Overlay scuro per leggibilità testo */}
                    <div className="absolute inset-0 bg-black/45" />
                </div>

                {/* Contenuto */}
                <div className="relative z-10 py-32 md:py-48 px-4 md:px-12 lg:px-24">
                    <div className="max-w-5xl mx-auto text-center md:text-left">
                    <div className="mb-6">
                        <p className="text-sm md:text-base font-bold text-yellow-300 uppercase tracking-widest mb-4">
                            ⚡ 217+ INSTALLAZIONI
                        </p>
                    </div>

                    {/* Titolo principale */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8">
                        <span className="block">Installiamo ogni giorno</span>
                        <span className="block text-yellow-300">in tutta Lombardia.</span>
                    </h2>

                    {/* Sottotitolo */}
                    <p className="text-xl md:text-2xl font-bold text-white/95 max-w-3xl leading-relaxed">
                        Ogni tetto è diverso, ogni impianto è progettato su misura.
                    </p>

                    {/* Divider */}
                    <div className="my-10 flex items-center gap-4 justify-center md:justify-start">
                        <div className="h-1 w-16 bg-yellow-300 rounded-full" />
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl">
                        <div>
                            <p className="text-3xl md:text-5xl font-black text-yellow-300 leading-none">+7</p>
                            <p className="text-xs md:text-sm text-white/80 font-semibold uppercase tracking-wider mt-2">Anni di esperienza</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-5xl font-black text-yellow-300 leading-none">100%</p>
                            <p className="text-xs md:text-sm text-white/80 font-semibold uppercase tracking-wider mt-2">Squadre interne</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-5xl font-black text-yellow-300 leading-none">2 gg</p>
                            <p className="text-xs md:text-sm text-white/80 font-semibold uppercase tracking-wider mt-2">Tempo medio installazione</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            {/* Griglia Lavori */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-12 lg:px-24 max-w-6xl">

                    {/* Griglia 2x3 lavori */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {works.map((work) => (
                        <div key={work.id} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                            <img
                                src={work.image}
                                alt={work.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Badge kWp in alto */}
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider bg-yellow-400 text-slate-900 px-2.5 py-1 rounded-lg">
                                    {work.kwp}
                                </span>
                                <span className="text-[11px] md:text-xs font-bold text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                                    {work.time}
                                </span>
                            </div>

                            {/* Info in basso */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                <h3 className="text-white font-black text-sm md:text-base leading-tight mb-2">
                                    {work.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    {/* Avatar */}
                                    <div className="w-7 h-7 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-slate-700 shrink-0">
                                        <span className="text-[10px] font-black text-white leading-none">
                                            {work.initials}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {/* Stelle */}
                                        <div className="flex items-center gap-0">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-white/60 text-[10px] md:text-xs font-medium">
                                            {work.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>

                </div>
            </section>
        </>
    );
};

export default RecentWorks;
