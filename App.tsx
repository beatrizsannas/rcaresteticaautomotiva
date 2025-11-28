import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import AIAdvisor from './components/AIAdvisor';
import CarVisualizer from './components/CarVisualizer';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 font-sans selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <ServiceSection />
      <CarVisualizer />
      <AIAdvisor />
      <Contact />
      <footer className="bg-black py-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} R-Car Estética Automotiva. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;