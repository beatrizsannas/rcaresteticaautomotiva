import React from 'react';
import { ServiceCategory } from '../types';
import { Car, Bike, Sofa, CheckCircle2 } from 'lucide-react';

interface Props {
  category: ServiceCategory;
}

const ServiceCard: React.FC<Props> = ({ category }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Bike': return <Bike className="w-6 h-6" />;
      case 'Sofa': return <Sofa className="w-6 h-6" />;
      default: return <Car className="w-6 h-6" />;
    }
  };

  return (
    <div className="group bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-2xl">
      <div className="grid lg:grid-cols-12 gap-0">
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
          <img 
            src={category.image} 
            alt={category.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900"></div>
          
          <div className="absolute top-6 left-6">
            <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl">
              <div className="text-red-500">
                {getIcon(category.iconName)}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 lg:hidden">
            <h3 className="text-2xl font-bold text-white shadow-black drop-shadow-md">{category.title}</h3>
          </div>
        </div>
        
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-8 hidden lg:block">{category.title}</h3>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
            {category.subCategories ? (
              category.subCategories.map((sub, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-sm uppercase tracking-wider text-red-500 font-bold border-b border-gray-800 pb-2">{sub.title}</h4>
                  <ul className="space-y-3">
                    {sub.items.map((item) => (
                      <li key={item.id} className="flex justify-between items-start group/item">
                        <div className="flex gap-2 text-gray-400 group-hover/item:text-gray-200 transition-colors">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-gray-600 group-hover/item:text-red-500 transition-colors" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-white whitespace-nowrap ml-2">
                          {item.isStartingPrice && <span className="text-[10px] text-gray-500 font-normal mr-1 uppercase">A partir</span>}
                          R$ {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="col-span-2">
                 <ul className="grid sm:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center p-4 rounded-xl bg-gray-800/50 border border-gray-800 hover:border-gray-700 transition-colors">
                      <span className="text-gray-300 font-medium">{item.name}</span>
                      <span className="text-white font-bold bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                         {item.isStartingPrice && <span className="text-[10px] text-gray-500 font-normal mr-1">A partir</span>}
                         R$ {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;