import React, { useState } from 'react';
import { PHONE_NUMBER } from '../utils/constants';
import { Layers, Wrench, Phone, Clock, Ruler, CheckCircle, Star, Sparkles, TrendingUp, DollarSign, Flame } from 'lucide-react';

const floorTypes = [
  {
    name: 'Impianto Radiante Standard',
    detail: 'Pannelli isolanti + tubazioni PE-Xa + collettore — soluzione più richiesta per appartamenti',
    price: '30–45 €/mq',
    time: '3–5 gg / 80mq',
    badge: 'Più richiesto',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    BadgeIcon: Star,
  },
  {
    name: 'Radiante a Basso Spessore',
    detail: 'Pannelli bugnati sottili (30mm) ideale per ristrutturazioni senza demolire il massetto',
    price: '40–55 €/mq',
    time: '2–4 gg / 80mq',
    badge: 'Ristrutturazione',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    BadgeIcon: TrendingUp,
  },
  {
    name: 'Radiante + Massetto',
    detail: 'Pacchetto completo: isolamento, tubazioni, collettore e massetto autolivellante incluso',
    price: '50–70 €/mq',
    time: '5–7 gg / 80mq',
    badge: 'Chiavi in mano',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    BadgeIcon: Sparkles,
  },
  {
    name: 'Raffrescamento a Pavimento',
    detail: 'Impianto radiante bivalente: riscalda d\'inverno e raffresca d\'estate con deumidificazione',
    price: '55–75 €/mq',
    time: '5–7 gg / 80mq',
    badge: 'Premium',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    BadgeIcon: Sparkles,
  },
  {
    name: 'Solo Collettore + Regolazione',
    detail: 'Fornitura e installazione collettore, testine elettrotermiche, termostati zona e centralina',
    price: '800–1.500 €',
    time: '1 gg',
    badge: null,
  },
  {
    name: 'Radiante Industriale / Commerciale',
    detail: 'Grandi superfici: capannoni, showroom, uffici — progettazione termica su misura',
    price: 'Su progetto',
    time: 'Su progetto',
    badge: null,
  },
];

const extraServices = [
  { Icon: Layers,       name: 'Massetto Radiante',                 detail: 'Massetto autolivellante specifico per impianti radianti. Conduttività termica ottimale.',            price: 'Su preventivo', highlight: false },
  { Icon: Flame,        name: 'Collegamento Caldaia / Pompa di Calore', detail: 'Raccordo dell\'impianto radiante alla fonte di calore esistente o nuova.',                     price: 'Su preventivo', highlight: false },
  { Icon: Wrench,       name: 'Demolizione Vecchio Massetto',      detail: 'Rimozione completa del massetto esistente per installazione impianto radiante ex novo.',              price: 'Su preventivo', highlight: false },
  { Icon: CheckCircle,  name: 'Collaudo & Prova di Tenuta',        detail: 'Test idraulico a pressione e verifica termica completa prima della chiusura del massetto.',           price: 'Incluso',      highlight: true  },
  { Icon: Ruler,        name: 'Progettazione Termica',             detail: 'Calcolo del fabbisogno termico zona per zona e dimensionamento ottimale dei circuiti.',               price: 'Incluso',      highlight: true  },
  { Icon: Layers,       name: 'Isolamento Termico / Acustico',     detail: 'Pannelli isolanti XPS/EPS sotto l\'impianto per massima efficienza e zero dispersioni.',              price: 'Su preventivo', highlight: false },
  { Icon: CheckCircle,  name: 'Sopralluogo & Preventivo',          detail: 'Veniamo a casa tua, misuriamo e consegniamo preventivo dettagliato entro 24h. Zero impegni.',         price: 'Gratuito',     highlight: true  },
  { Icon: CheckCircle,  name: 'Pulizia Post-Lavoro',               detail: 'Al termine ripuliamo il cantiere. Consegniamo la casa pulita e abitabile subito.',                    price: 'Incluso',      highlight: true  },
];

const ServicesTable = () => {
  const [activeTab, setActiveTab] = useState('impianti');

  const tabs = [
    { id: 'impianti', label: 'Tipi di Impianto',     Icon: Flame },
    { id: 'servizi',  label: 'Servizi Aggiuntivi',   Icon: Wrench },
  ];

  return (
    <section className="bg-slate-50 py-20 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
            Listino Prezzi <span className="text-orange-500">2026</span>
            <br/>
            <span className="relative inline-block">
              <span className="relative z-10">Lombardia</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-400/30 -rotate-1 -z-0"></span>
            </span>
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 mb-8 shadow-sm gap-1">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === id
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        {/* TAB 1 — Tipi di impianto */}
        {activeTab === 'impianti' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

            {/* Header colonne — solo desktop */}
            <div className="hidden md:grid grid-cols-[2.5fr_3fr_1.4fr_1.4fr] px-6 py-3 bg-slate-50 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tipo Impianto</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Dettaglio</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <Ruler className="w-3 h-3" /> Costo Posa
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Tempi Medi
              </span>
            </div>

            {floorTypes.map((item, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-[2.5fr_3fr_1.4fr_1.4fr] px-4 md:px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors items-start md:items-center gap-y-1 gap-x-4"
              >
                {/* Nome + badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm leading-snug">{item.name}</span>
                  {item.badge && item.BadgeIcon && (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeBg} ${item.badgeText}`}>
                      <item.BadgeIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Dettaglio */}
                <span className="text-slate-500 text-xs leading-relaxed">{item.detail}</span>

                {/* Prezzo */}
                <span className="font-black text-orange-600 text-sm tabular-nums">{item.price}</span>

                {/* Tempi */}
                <span className="text-slate-400 text-xs">{item.time}</span>
              </div>
            ))}

            {/* Nota */}
            <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
                </svg>
              </span>
              <p className="text-xs text-amber-700 font-medium">
                I prezzi includono <strong>materiale e manodopera</strong> e variano in base a superficie, stato del sottofondo e complessità dell'impianto. Preventivo esatto dopo sopralluogo gratuito.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2 — Servizi aggiuntivi */}
        {activeTab === 'servizi' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {extraServices.map((s, idx) => (
              <div
                key={idx}
                className={`flex gap-4 items-start p-5 rounded-2xl border transition-all ${
                  s.highlight
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Icona */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  s.highlight ? 'bg-orange-200' : 'bg-slate-100'
                }`}>
                  <s.Icon className={`w-4 h-4 ${s.highlight ? 'text-orange-700' : 'text-slate-500'}`} strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                    <span className="font-black text-slate-900 text-sm">{s.name}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                      s.highlight
                        ? 'bg-orange-200 text-orange-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {s.price}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA bottom */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 rounded-2xl">
          <div>
            <p className="text-white font-black text-lg leading-tight">Vuoi un preventivo GRATIS preciso al centesimo?</p>
            <p className="text-slate-400 text-sm mt-0.5">Chiamaci o scrivici su WhatsApp — nessun obbligo.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Telefono */}
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-black px-5 py-3 rounded-xl transition-colors whitespace-nowrap text-sm shadow-lg"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              Chiama Ora
            </a>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Ciao! Vorrei un preventivo gratuito per il riscaldamento a pavimento.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black px-5 py-3 rounded-xl transition-colors whitespace-nowrap text-sm shadow-lg"
            >
              {/* WhatsApp SVG icon */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesTable;
