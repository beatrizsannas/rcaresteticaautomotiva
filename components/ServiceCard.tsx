import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  item: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-800 hover:border-rcar-neon/50 transition-colors group">
      <div className="flex flex-col">
        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
          {item.name}
        </span>
        {item.description && (
          <span className="text-gray-400 text-xs mt-1">{item.description}</span>
        )}
      </div>
      <div className="flex flex-col items-end">
        {item.isStartingPrice && <span className="text-[10px] text-gray-500 uppercase tracking-widest">A partir de</span>}
        <span className="text-rcar-neon font-display font-bold text-lg group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all">
          R$ {item.price}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;