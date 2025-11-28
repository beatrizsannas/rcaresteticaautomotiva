import React from 'react';
import { Phone, Instagram, MapPin, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-black pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-3xl text-white">
              R'<span className="text-rcar-neon">CAR</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevando o padrão da estética automotiva. Cuidado, tecnologia e paixão por carros em cada serviço realizado.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest mb-4">Contato</h4>

            <div className="flex items-center gap-3 text-gray-400 group">
              <Phone className="w-5 h-5 text-rcar-neon group-hover:animate-bounce" />
              <span>{CONTACT_INFO.phone}</span>
            </div>

            <a 
              href={CONTACT_INFO.instagramUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-3 text-gray-400 hover:text-rcar-neon transition-colors"
              aria-label="Instagram da R-Car"
            >
              <Instagram className="w-5 h-5" />
              <span>{CONTACT_INFO.instagram}</span>
            </a>

            <div className="flex items-center gap-3 text-gray-400">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span>Cuiabá - MT</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest mb-4">Agendamento</h4>
            <p className="text-gray-500 text-xs mb-4">
              Atendimento exclusivo com hora marcada. Entre em contato para garantir seu horário.
            </p>

            <a 
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center
