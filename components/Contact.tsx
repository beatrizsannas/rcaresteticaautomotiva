import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Phone, Instagram, MapPin, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-gray-950 border-t border-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">FALE CONOSCO</h2>
        <p className="text-gray-400 mb-16 text-lg">Estamos prontos para atender você e transformar seu veículo.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <a 
            href={CONTACT_INFO.whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-gray-900 rounded-3xl border border-gray-800 hover:border-green-600/50 hover:bg-gray-800 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-gray-500" size={20} />
            </div>
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
            <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{CONTACT_INFO.phone}</p>
          </a>

          <a 
            href={CONTACT_INFO.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-gray-900 rounded-3xl border border-gray-800 hover:border-pink-600/50 hover:bg-gray-800 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-gray-500" size={20} />
            </div>
            <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Instagram className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instagram</h3>
            <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{CONTACT_INFO.instagram}</p>
          </a>

          <div className="flex flex-col items-center p-8 bg-gray-900 rounded-3xl border border-gray-800 hover:border-blue-600/50 hover:bg-gray-800 transition-all group">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Localização</h3>
            <p className="text-gray-400 text-sm">Atendimento em Domicílio <br/> Sistema Leva e Traz</p>
          </div>
        </div>

        <div className="mt-20">
          <a 
            href={CONTACT_INFO.whatsappUrl}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-10 rounded-full text-lg shadow-xl shadow-green-900/20 transition-all transform hover:-translate-y-1"
          >
            <Phone size={24} />
            Agendar Agora pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;