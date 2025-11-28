import React from 'react';
import { SERVICE_DATA } from '../constants';
import ServiceCard from './ServiceCard';

const ServiceSection: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 bg-gray-950 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">NOSSOS SERVIÇOS</h2>
          <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Soluções completas para valorizar e proteger seu patrimônio com produtos de alta performance.
          </p>
        </div>
        
        <div className="space-y-12">
          {SERVICE_DATA.map((category) => (
            <ServiceCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;