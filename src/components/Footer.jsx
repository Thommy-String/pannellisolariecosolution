import { Link } from 'react-router-dom';
import { COMPANY_NAME, PHONE_NUMBER } from '../utils/constants';
import logoImage from '../assets/logo/eco-solutions-logo-.jpeg';
import { Phone, MessageCircle, Mail, MapPin, Zap, Clock } from 'lucide-react';

function Footer() {
  const email = "info@ecosolutionsas.com"; 

  return (
    <footer
      id="contatti"
      className="border-t border-slate-200 bg-white relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/3 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logoImage}
                alt={COMPANY_NAME}
                className="h-20 w-auto rounded-xl shadow-sm border border-white"
                loading="lazy"
              />
            </Link>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800 leading-relaxed uppercase tracking-tight">
                Ecosolution. Specialisti in impianti fotovoltaici chiavi in mano.
              </p>
              <div className="flex items-center gap-2 text-yellow-600">
                <Zap className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Energia solare con squadre interne</span>
              </div>
            </div>
          </div>

          {/* Column 2: Servizi Categorizzati */}
          <div className="lg:col-span-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              I Nostri Servizi
            </p>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-[10px] font-bold text-yellow-600 uppercase mb-3 tracking-widest">Impianti Fotovoltaici</p>
                <ul className="space-y-2 text-sm text-slate-600 font-bold uppercase tracking-tighter">
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Impianto 3-5 kWp</li>
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Impianto 6-10 kWp</li>
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Fotovoltaico + Batteria</li>
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Pompa Calore Solare</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold text-yellow-600 uppercase mb-3 tracking-widest">Servizi Inclusi</p>
                <ul className="space-y-2 text-sm text-slate-600 font-bold uppercase tracking-tighter">
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Sopralluogo Gratuito</li>
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Pratiche GSE e Enel</li>
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Detrazioni Fiscali</li>
                  <li className="hover:text-yellow-600 transition-colors cursor-pointer">Assistenza 25 Anni</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                Dove Operiamo
              </p>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-slate-700 font-bold uppercase tracking-tight">
                  Milano, Monza, Bergamo, Brescia e tutta la Lombardia.
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                Disponibilità
              </p>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-slate-700 font-bold uppercase tracking-tight">
                  Lunedì - Sabato: 07:00 - 20:00<br/>
                  <span className="text-blue-600">Pronto Intervento H24</span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Professional CTAs */}
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              Contattaci Ora
            </p>
            
            <a 
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
              className="inline-flex items-center justify-center gap-3 w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold uppercase tracking-tight px-6 py-4 rounded-2xl text-sm md:text-base transition-all shadow-[0_8px_0_0_rgba(161,98,7,0.8),0_16px_30px_-6px_rgba(250,204,21,0.4)] hover:shadow-[0_4px_0_0_rgba(161,98,7,0.8),0_12px_20px_-4px_rgba(250,204,21,0.5)] hover:-translate-y-0.5 active:translate-y-1"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              Chiama: {PHONE_NUMBER}
            </a>

            <a 
              href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(`Buongiorno ${COMPANY_NAME}, vorrei un preventivo per un impianto fotovoltaico.`)}`}
              onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
              className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold uppercase tracking-tight px-6 py-4 rounded-2xl text-sm md:text-base transition-all shadow-[0_8px_0_0_rgba(25,118,65,0.8),0_16px_30px_-6px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_0_0_rgba(25,118,65,0.8),0_12px_20px_-4px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:translate-y-1"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              WhatsApp
            </a>

            <a 
              href={`mailto:${email}`}
              onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
              className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-800 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase">Email Preventivi</span>
                <span className="text-sm font-black text-slate-900">Invia Progetto</span>
              </div>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <div>
            © {new Date().getFullYear()} {COMPANY_NAME} | P.IVA 11634620967
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
