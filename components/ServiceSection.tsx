import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Bike, Armchair, X, ArrowRight } from 'lucide-react';
import { SERVICE_DATA, CONTACT_INFO } from '../constants';
import { ServiceCategory } from '../types';
import ServiceCard from './ServiceCard';

const ServiceSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCategory]);

  const getIcon = (iconName: string, className = "w-8 h-8") => {
    switch (iconName) {
      case 'Car': return <Car className={className} />;
      case 'Bike': return <Bike className={className} />;
      case 'Sofa': return <Armchair className={className} />;
      default: return <Car className={className} />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, category: ServiceCategory) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedCategory(category);
    }
  };

  return (
    <section id="services" className="py-12 md:py-24 bg-rcar-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            NOSSOS <span className="text-rcar-neon">SERVIÇOS</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-rcar-neon mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          <p className="mt-4 md:mt-6 text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Selecione uma categoria abaixo para visualizar a tabela completa de serviços e preços.
          </p>
        </div>

        {/* 3-Column Grid Layout for Desktop (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {SERVICE_DATA.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              onKeyDown={(e) => handleKeyDown(e, category)}
              role="button"
              tabIndex={0}
              className="group relative h-[220px] md:h-[280px] w-full rounded-2xl overflow-hidden cursor-pointer border border-gray-800 hover:border-rcar-neon/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] focus:outline-none focus:ring-2 focus:ring-rcar-neon focus:ring-offset-2 focus:ring-offset-black"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay - Bottom to Top for Grid Card */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
              </div>

              {/* Content - Centered for Minimalist Look */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end md:justify-center items-center text-center">
                <div className="mb-3 p-3 bg-rcar-neon/10 backdrop-blur-sm rounded-full text-rcar-neon border border-rcar-neon/20 group-hover:bg-rcar-neon group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] transform group-hover:-translate-y-2">
                  {getIcon(category.iconName, "w-6 h-6 md:w-8 md:h-8")}
                </div>
                
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-1 group-hover:text-rcar-neon transition-colors leading-tight">
                  {category.title}
                </h3>
                
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 flex flex-col items-center mt-2">
                    <span className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/10">
                        Ver Tabela <ArrowRight className="w-3 h-3 text-rcar-neon" />
                    </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-16 text-center">
           <p className="text-gray-400 text-xs md:text-sm">
            Não encontrou o que precisa? <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-rcar-neon hover:underline font-bold cursor-pointer">Fale com nossa equipe</a>
           </p>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 w-full max-w-2xl max-h-[85vh] rounded-2xl border border-rcar-neon/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="relative h-40 md:h-56 shrink-0 overflow-hidden">
                <img 
                    src={selectedCategory.image} 
                    className="w-full h-full object-cover opacity-50" 
                    alt="Cabeçalho da categoria" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                
                <button 
                    onClick={() => setSelectedCategory(null)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 p-2 bg-black/50 hover:bg-rcar-neon hover:text-black text-white rounded-full transition-all border border-white/10 z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rcar-neon"
                    aria-label="Fechar"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="absolute inset-0 flex items-center px-6 md:px-8 gap-4 md:gap-6">
                    <div className="p-2 md:p-3 bg-rcar-neon text-black rounded-lg md:rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
                        {getIcon(selectedCategory.iconName, "w-6 h-6 md:w-8 md:h-8")}
                    </div>
                    <div>
                        <h3 id="modal-title" className="font-display font-bold text-xl md:text-3xl text-white">
                            {selectedCategory.title}
                        </h3>
                        <p className="text-rcar-neon text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Tabela Oficial</p>
                    </div>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gradient-to-b from-gray-900 to-black">
                <div className="space-y-8 md:space-y-10">
                    {/* Top level items */}
                    {selectedCategory.items.length > 0 && (
                        <div className="space-y-1">
                            {selectedCategory.items.map((item) => (
                                <ServiceCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}

                    {/* Subcategories */}
                    {selectedCategory.subCategories && selectedCategory.subCategories.map((sub, idx) => (
                        <div key={idx} className="space-y-3 md:space-y-4">
                            <h4 className="flex items-center gap-3 text-white text-base md:text-lg font-bold uppercase tracking-wider pb-2 border-b border-gray-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-rcar-neon"></span> {sub.title}
                            </h4>
                            <div className="pl-0 md:pl-2 space-y-1">
                                {sub.items.map((item) => (
                                    <ServiceCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 text-center backdrop-blur-sm">
                    <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4">
                        Precisa de algo diferente? Fazemos orçamentos sob medida.
                    </p>
                    <a 
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-rcar-neon hover:text-white font-bold text-xs md:text-sm uppercase tracking-widest transition-all group cursor-pointer"
                    >
                        Solicitar Orçamento <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceSection;