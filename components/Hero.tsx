import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Car Detail" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/40 to-gray-950"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium mb-6 backdrop-blur-sm">
          <Star className="w-4 h-4 fill-current" />
          <span>Estética Automotiva Premium</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-white">
          DETALHE QUE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">IMPRESSIONA</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Transformamos veículos em obras de arte. Especialistas em detalhamento, proteção e restauração automotiva.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#services" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-900/20">
            Nossos Serviços <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#contact" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all hover:border-white/40">
            Agendar Horário
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;