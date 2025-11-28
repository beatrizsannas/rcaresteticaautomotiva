import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-white bg-black min-h-screen selection:bg-rcar-neon selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <ServiceSection />
      </main>
      <Contact />
    </div>
  );
};

export default App;