import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden bg-black h-screen"
      style={{ height: '100dvh' }} // Force dynamic viewport height inline for maximum compatibility
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2560&auto=format&fit=crop"
          alt="Detalhe de carro esportivo de luxo com acabamento impecável em ambiente escuro"
          className="w-full h-full object-cover object-center"
          // @ts-ignore - React 18/19 support but types might lag
          fetchPriority="high"
        />
        {/* Gradient Overlays for that 'Dark Corporate' feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90"></div>
        
        {/* Neon decorative glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rcar-neon/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-5 py-2 border border-rcar-neon/50 rounded-full bg-rcar-neon/5 backdrop-blur-md">
            <span className="text-rcar-neon text-sm md:text-base font-bold tracking-[0.2em] uppercase">
              Excelência em cada detalhe
            </span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-8xl lg:text-9xl text-white mb-4 md:mb-8 leading-tight neon-text">
            R'CAR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-4xl md:text-7xl lg:text-8xl font-sans font-light">
              ESTÉTICA AUTOMOTIVA
            </span>
          </h1>

          <p className="font-sans text-white text-lg md:text-2xl max-w-xl md:max-w-3xl mx-auto mb-10 md:mb-12 font-light tracking-wide leading-relaxed drop-shadow-lg shadow-black">
            Transformamos veículos em obras de arte. Proteção, brilho e cuidado premium para quem exige o melhor.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              onClick={(e) => handleScroll(e, 'services')}
              className="px-10 py-4 bg-rcar-neon text-black font-bold uppercase tracking-widest text-sm md:text-base rounded-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer z-20"
            >
              Nossos Serviços
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;