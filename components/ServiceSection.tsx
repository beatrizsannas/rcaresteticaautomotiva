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
    <section id="services" className="py-16 bg-rcar-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            NOSSOS <span className="text-rcar-neon">SERVIÇOS</span>
          </h2>
          <div className="w-12 h-1 bg-rcar-neon mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
        </div>

        {/* Layout Minimalista: Grid de 3 colunas com altura fixa e controlada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              // Altura fixa (h-64 = 256px) para garantir uniformidade e tamanho compacto
              className="group relative w-full h-64 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-rcar-neon/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none focus:ring-2 focus:ring-rcar-neon"
            >
              {/* Imagem de Fundo */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              </div>

              {/* Conteúdo Centralizado */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-10">
                <div className="mb-3 p-2.5 bg-black/40 backdrop-blur-md rounded-full text-rcar-neon border border-rcar-neon/30 group-hover:bg-rcar-neon group-hover:text-black transition-all duration-300 shadow-lg">
                  {getIcon(category.iconName, "w-6 h-6")}
                </div>
                
                <h3 className="font-display font-bold text-xl text-white group-hover:text-rcar-neon transition-colors drop-shadow-md">
                  {category.title}
                </h3>
                
                <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 text-white text-[10px] font-bold uppercase tracking-widest bg-rcar-neon/20 backdrop-blur-sm px-3 py-1 rounded-full border border-rcar-neon/50">
                        Ver Detalhes
                    </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
           <p className="text-gray-500 text-xs">
             <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-rcar-neon transition-colors underline decoration-rcar-neon/30 underline-offset-4">Precisa de um orçamento personalizado?</a>
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 w-full max-w-2xl max-h-[85vh] rounded-2xl border border-gray-800 shadow-[0_0_50px_rgba(6,182,212,0.1)] flex flex-col overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="relative h-40 shrink-0 overflow-hidden">
                <img 
                    src={selectedCategory.image} 
                    className="w-full h-full object-cover opacity-40" 
                    alt="Cabeçalho" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                
                <button 
                    onClick={() => setSelectedCategory(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white hover:text-black text-white rounded-full transition-all border border-white/10 z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 md:left-8 flex items-end gap-4">
                    <div className="p-2 bg-rcar-neon text-black rounded-lg shadow-lg">
                        {getIcon(selectedCategory.iconName, "w-6 h-6")}
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-2xl text-white leading-none">
                            {selectedCategory.title}
                        </h3>
                    </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-gray-900">
                <div className="space-y-8">
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
                        <div key={idx} className="space-y-3">
                            <h4 className="text-rcar-neon text-sm font-bold uppercase tracking-widest pb-1 border-b border-gray-800/50">
                                {sub.title}
                            </h4>
                            <div className="space-y-1">
                                {sub.items.map((item) => (
                                    <ServiceCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <a 
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-rcar-neon/10 hover:bg-rcar-neon text-rcar-neon hover:text-black px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border border-rcar-neon/20"
                    >
                        Solicitar Orçamento <ArrowRight className="w-4 h-4" />
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