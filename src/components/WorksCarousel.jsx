import React, { useRef, useEffect } from 'react';

import lavoro11 from '../assets/lavori/lavoro11.jpg';
import lavoro12 from '../assets/lavori/lavoro12.jpg';
import lavoro14 from '../assets/lavori/lavoro14.jpg';
import lavoro15 from '../assets/lavori/lavoro15.jpg';
import lavoro16 from '../assets/lavori/lavoro16.jpg';
import lavoro17 from '../assets/lavori/lavoro17.jpg';
import lavoro18 from '../assets/lavori/lavoro18.jpg';
import lavoro19 from '../assets/lavori/lavoro19.jpg';
import lavoro20 from '../assets/lavori/lavoro20.jpg';
import lavoro21 from '../assets/lavori/lavoro21.jpg';
import lavoro22 from '../assets/lavori/lavoro22.jpg';
import lavoro23 from '../assets/lavori/lavoro23.jpg';
import lavoro24 from '../assets/lavori/lavoro24.jpg';
import lavoro25 from '../assets/lavori/lavoro25.jpg';
import lavoro26 from '../assets/lavori/lavoro26.jpg';
import lavoro27 from '../assets/lavori/lavoro27.jpg';
import lavoro28 from '../assets/lavori/lavoro28.jpg';

const works = [
  { img: lavoro11, title: 'Radiante standard',      sqm: 78,  time: '3 gg', location: 'Milano - Navigli',     avatar: 'https://i.pravatar.cc/100?img=20', initials: 'LF', useInitials: false },
  { img: lavoro20, title: 'Radiante + massetto',  sqm: 70,  time: '4 gg', location: 'Varese - Lago',        avatar: 'https://i.pravatar.cc/100?img=29', initials: 'DT', useInitials: true  },
  { img: lavoro15, title: 'Radiante bagno',            sqm: 63,  time: '2 gg', location: 'Milano - Porta Romana',avatar: 'https://i.pravatar.cc/100?img=24', initials: 'EV', useInitials: false },
  { img: lavoro18, title: 'Radiante basso spessore',            sqm: 55,  time: '2 gg', location: 'Lecco - Lago',         avatar: 'https://i.pravatar.cc/100?img=27', initials: 'CL', useInitials: false },
  { img: lavoro27, title: 'Radiante zona giorno',       sqm: 105, time: '5 gg', location: 'Milano - Loreto',      avatar: 'https://i.pravatar.cc/100?img=36', initials: 'IL', useInitials: false },
  { img: lavoro17, title: 'Radiante villa',  sqm: 84,  time: '4 gg', location: 'Milano - Brera',       avatar: 'https://i.pravatar.cc/100?img=26', initials: 'SM', useInitials: true  },
  { img: lavoro16, title: 'Radiante appartamento',     sqm: 110, time: '6 gg', location: 'Bergamo - Centro',     avatar: 'https://i.pravatar.cc/100?img=25', initials: 'GP', useInitials: false },
  { img: lavoro12, title: 'Radiante + pompa calore',       sqm: 95,  time: '5 gg', location: 'Varese - Centro',      avatar: 'https://i.pravatar.cc/100?img=21', initials: 'MC', useInitials: false },
  { img: lavoro14, title: 'Radiante ristrutturazione',    sqm: 42,  time: '3 gg', location: 'Monza - Brianza',      avatar: 'https://i.pravatar.cc/100?img=23', initials: 'TB', useInitials: false },
  { img: lavoro28, title: 'Radiante industriale', sqm: 115, time: '6 gg', location: 'Como - Brunate',       avatar: 'https://i.pravatar.cc/100?img=37', initials: 'KS', useInitials: true  },
  { img: lavoro19, title: 'Radiante + raffrescamento',       sqm: 130, time: '7 gg', location: 'Milano - CityLife',    avatar: 'https://i.pravatar.cc/100?img=28', initials: 'RN', useInitials: false },
  { img: lavoro21, title: 'Radiante standard',        sqm: 48,  time: '3 gg', location: 'Como - Centro',        avatar: 'https://i.pravatar.cc/100?img=30', initials: 'FP', useInitials: false },
  { img: lavoro22, title: 'Radiante cucina',          sqm: 60,  time: '2 gg', location: 'Monza - San Gerardo',  avatar: 'https://i.pravatar.cc/100?img=31', initials: 'AG', useInitials: false },
  { img: lavoro23, title: 'Radiante open space',            sqm: 98,  time: '5 gg', location: 'Milano - Garibaldi',   avatar: 'https://i.pravatar.cc/100?img=32', initials: 'NR', useInitials: false },
  { img: lavoro24, title: 'Radiante bagno',        sqm: 12,  time: '3 gg', location: 'Brescia - Centro',     avatar: 'https://i.pravatar.cc/100?img=33', initials: 'VB', useInitials: true  },
  { img: lavoro25, title: 'Radiante + collettore',         sqm: 72,  time: '3 gg', location: 'Milano - Bovisa',      avatar: 'https://i.pravatar.cc/100?img=34', initials: 'OM', useInitials: false },
  { img: lavoro26, title: 'Radiante villa',    sqm: 87,  time: '4 gg', location: 'Varese - Malnate',     avatar: 'https://i.pravatar.cc/100?img=35', initials: 'PC', useInitials: false },
];

const allWorks = [...works, ...works];

const ITEM_WIDTH = 220;
const CARD_HEIGHT = 280;
const GAP = 14;
const SPEED = 1.2;

const GoogleLogo = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const WorksCarousel = () => {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  const singleSetWidth = works.length * (ITEM_WIDTH + GAP);

  useEffect(() => {
    const animate = () => {
      if (!pausedRef.current && trackRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= singleSetWidth) {
          posRef.current -= singleSetWidth;
        }
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [singleSetWidth]);

  return (
    <div
      className="w-full bg-slate-100 py-4 overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: `${GAP}px`, width: `${allWorks.length * (ITEM_WIDTH + GAP)}px` }}
      >
        {allWorks.map((work, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg relative group"
            style={{ width: ITEM_WIDTH, height: CARD_HEIGHT }}
          >
            {/* Immagine */}
            <img
              src={work.img}
              alt={work.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Overlay gradient top */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/20 to-transparent pointer-events-none" />

            {/* TOP: titolo + badge mq + badge time */}
            <div className="absolute top-0 left-0 right-0 p-2.5">
              <h3 className="text-white font-black text-xs text-left leading-tight mb-1.5 drop-shadow-md truncate">
                {work.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] font-black leading-none">
                <span className="flex items-center gap-1 bg-blue-600/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-white/95">
                  <svg className="w-3 h-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {work.sqm} mq
                </span>
                <span className="flex items-center gap-1 bg-amber-600/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-white/95">
                  <svg className="w-3 h-3 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {work.time}
                </span>
              </div>
            </div>

            {/* Overlay gradient bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />

            {/* BOTTOM: avatar + stelle + Google logo + location */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <div className="flex items-center gap-2">
                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-full border-2 border-yellow-400 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                  {work.useInitials ? (
                    <span className="text-[10px] font-black text-white">{work.initials}</span>
                  ) : (
                    <>
                      <img
                        src={work.avatar}
                        alt={work.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <span className="hidden text-[10px] font-black text-white items-center justify-center w-full h-full">
                        {work.initials}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* 5 stelle + logo Google */}
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="flex items-center gap-0">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <GoogleLogo />
                  </div>
                  {/* Location con pin */}
                  <p className="text-white/80 text-[9px] font-bold truncate flex items-center gap-0.5">
                    <svg className="w-2.5 h-2.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
  );
};

export default WorksCarousel;
