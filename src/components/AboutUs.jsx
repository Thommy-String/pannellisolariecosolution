import React from 'react';
import { COMPANY_NAME, PHONE_NUMBER } from '../utils/constants';
import { UserCheck, ShieldCheck, Award, Building2, Users2, MapPin, MessageCircle, Camera } from 'lucide-react';
import ecoLogo from '../assets/logo/eco-solutions-logo-.jpeg';
import img1 from '../assets/images/aboutuslavori copia/1.jpeg';
import img2 from '../assets/images/aboutuslavori copia/2.jpeg';
import img3 from '../assets/images/aboutuslavori copia/3.jpeg';
import img4 from '../assets/images/aboutuslavori copia/4.jpeg';
import img5 from '../assets/images/aboutuslavori copia/5.jpeg';
import img6 from '../assets/images/aboutuslavori copia/6.jpeg';

const images = [img1, img2, img3, img4, img5, img6];

function AboutUs() {
    return (
        <section className="bg-slate-900 py-24 overflow-hidden relative">
            {/* Logo Bianco Stilizzato in alto a destra */}
            <div className="absolute top-8 right-8 opacity-20 hidden lg:block">
                <img src={ecoLogo} alt="Logo Ecosolutionsas" className="w-16 h-16 object-contain grayscale brightness-[100] invert" />
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Side: Content */}
                    <div className="text-left">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-widest text-[10px] mb-6 rounded-full">
                            <img src={ecoLogo} alt="Logo" className="w-5 h-5 rounded-full object-cover" />
                            ECOSOLUTION - DITTA EDILE
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                            Un'Impresa <span className="text-yellow-400">Solida</span> <br className="hidden md:block"/>
                            al tuo fianco.
                        </h2>
                        
                        <div className="space-y-8 max-w-xl">
                            <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                                Ecosolutionsas non è solo un team di tecnici: siamo una realtà edile strutturata con <span className="text-white font-bold">oltre 50 operai specializzati</span>. Dalle fondamenta al tetto, gestiamo ogni aspetto della tua casa in tutta Lombardia.
                            </p>

                            <div className="bg-yellow-400/5 border-l-4 border-yellow-400 p-6 rounded-r-2xl">
                                <p className="text-white font-black uppercase tracking-tight mb-2">Perché conta per te?</p>
                                <p className="text-slate-400 text-sm md:text-base italic">
                                    "Significa che non scompariremo domani. Significa che abbiamo le attrezzature, le persone e la solidità finanziaria per garantire che il tuo investimento sia protetto, oggi e tra 10 anni."
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <a 
                                    href={`https://wa.me/${PHONE_NUMBER.replace(/\s+/g, '')}?text=${encodeURIComponent("Ciao! Vorrei parlarvi del mio progetto di riscaldamento a pavimento.")}`}
                                    className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-black uppercase tracking-tighter transition-all hover:-translate-y-1 shadow-lg shadow-yellow-400/20"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Parlaci del tuo progetto
                                </a>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                                        <Users2 className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <span className="text-white font-black uppercase tracking-tight text-sm block">50+ Professionisti</span>
                                        <span className="text-slate-500 text-xs">Personale interno, zero subappalti rischiosi.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                                        <MapPin className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <span className="text-white font-black uppercase tracking-tight text-sm block">Tutta Lombardia</span>
                                        <span className="text-slate-500 text-xs">Interveniamo ovunque con rapidità industriale.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Simple Image Carousel / Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-3 gap-3">
                            {images.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 ${
                                        idx % 2 === 0 ? 'mt-4' : '-mt-4'
                                    }`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Lavoro Ecosolutionsas ${idx + 1}`} 
                                        className="w-full h-40 md:h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Decorative floating badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-2xl transform rotate-3 hidden md:block border-4 border-yellow-400">
                            <div className="flex flex-col items-center">
                                <Award className="w-8 h-8 text-yellow-500 mb-1" />
                                <span className="text-2xl font-black text-slate-900 leading-none">BUILDERS</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Since 21 Years</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AboutUs;
