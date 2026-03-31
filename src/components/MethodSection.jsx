import { Brush, Ruler, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
    {
        number: "1",
        title: "Sopralluogo & Progettazione",
        subtitle: "Analisi del tuo spazio",
        desc: "Veniamo a casa tua per misurare, analizzare l'isolamento e le esigenze termiche. Progettiamo l'impianto radiante su misura, calcolando il fabbisogno zona per zona.",
        icon: Ruler,
        color: "bg-blue-600"
    },
    {
        number: "2",
        title: "Installazione Impianto",
        subtitle: "Posa professionale",
        desc: "Posiamo pannelli isolanti, tubazioni e collettori. Colleghiamo l'impianto alla caldaia o pompa di calore, eseguiamo il collaudo idraulico e la prova di tenuta.",
        icon: Brush,
        color: "bg-amber-500"
    },
    {
        number: "3",
        title: "Massetto & Collaudo Finale",
        subtitle: "Tutto funzionante",
        desc: "Realizziamo il massetto radiante, regoliamo termostati e zone, collaudiamo l'intero sistema. Ti consegniamo casa calda, pronta da vivere e con risparmio garantito.",
        icon: CheckCircle2,
        color: "bg-orange-500"
    }
];

function MethodSection() {
    return (
        <section className="bg-white py-20 border-b-2 border-slate-100">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mb-16">
                    <div className="inline-flex items-center px-3 py-1 bg-orange-500 text-white font-bold uppercase tracking-widest text-[10px] mb-4">
                        3 fasi
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                        <span className="relative inline-block">
                            <span className="relative z-10 px-2">Il Nostro Processo</span>
                            <span className="absolute inset-0 bg-orange-300 -rotate-1 z-0"></span>
                        </span>
                        <br/>
                        <span className="text-orange-500">Impianto Radiante Chiavi in Mano</span>
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl border-l-4 border-orange-500 pl-6 py-2">
                        Dal sopralluogo gratuito al collaudo finale. Il nostro metodo garantisce un impianto radiante perfetto, puntuale e senza stress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <div className="relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                                {/* Accent line on top */}
                                <div className={`absolute top-0 left-0 w-full h-1.5 ${step.color}`}></div>
                                
                                {/* Number & Icon Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-7xl font-black text-slate-900/10 group-hover:text-slate-900/20 transition-colors leading-none italic select-none">
                                        {step.number}
                                    </span>
                                    <div className={`w-14 h-14 ${step.color} flex items-center justify-center rounded-2xl shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform`}>
                                        <step.icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2 block">
                                        {step.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase leading-tight tracking-tighter">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Frecce tra le card (Desktop) - Improved visibility and positioning */}
                            {idx !== 2 && (
                                <div className="hidden lg:flex absolute -right-10 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 bg-white rounded-full border border-slate-200 shadow-md">
                                    <ArrowRight className="w-5 h-5 text-red-600" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MethodSection;
