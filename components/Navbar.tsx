import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    // Use passive listener for better scroll performance on mobile
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Small timeout to ensure the menu close animation doesn't interfere with the scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Calculate position manually to ensure offset is correct on all devices
        const navbarHeight = 80; // Approximate height of fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const navLinks = [
    { name: 'Serviços', id: 'services' },
    { name: 'Contato', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-black/80 backdrop-blur-lg border-b border-rcar-neon/20' : 'py-6 bg-transparent'}`}
      aria-label="Menu Principal"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="flex items-center gap-2 group cursor-pointer z-50"
          aria-label="R-Car Estética Automotiva - Voltar ao topo"
        >
          <ShieldCheck className="w-8 h-8 text-rcar-neon group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl tracking-wider text-white">
              R'<span className="text-rcar-neon">CAR</span>
            </span>
            <span className="text-[0.6rem] tracking-[0.2em] text-gray-400 -mt-1 uppercase">Estética Automotiva</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleScrollTo(e, link.id)}
              className="text-sm font-medium text-gray-300 hover:text-rcar-neon transition-colors uppercase tracking-widest relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rcar-neon transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-transparent border border-rcar-neon text-rcar-neon font-bold uppercase tracking-wider text-xs hover:bg-rcar-neon hover:text-black transition-all duration-300 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer z-50"
          >
            Agendar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? <X className="w-8 h-8 text-rcar-neon" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-rcar-neon/20 overflow-hidden absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  className="text-xl font-display font-bold text-white hover:text-rcar-neon transition-colors cursor-pointer py-2 border-b border-gray-800 last:border-0"
                  onClick={(e) => handleScrollTo(e, link.id)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center py-4 bg-rcar-neon text-black font-bold uppercase tracking-widest rounded-sm cursor-pointer hover:bg-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Agendar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;