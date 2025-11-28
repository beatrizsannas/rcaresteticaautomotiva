import { ServiceCategory } from './types';

export const SERVICE_DATA: ServiceCategory[] = [
  {
    id: 'cars',
    title: 'Carros',
    iconName: 'Car',
    // Dark sleek luxury car matching the aesthetic
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
    items: [], 
    subCategories: [
      {
        title: 'Lavagens',
        items: [
          { id: 'c-wash-1', name: 'Carro Compacto', price: 110 },
          { id: 'c-wash-2', name: 'Carro Hatch', price: 140 },
          { id: 'c-wash-3', name: 'Caminhonete', price: 170 },
        ]
      },
      {
        title: 'Polimento',
        items: [
          { id: 'c-pol-1', name: 'Polimento Comercial', price: 300 },
          { id: 'c-pol-2', name: 'Polimento Carro Preto', price: 350 },
          { id: 'c-pol-3', name: 'Enceramento Técnico', price: 100 },
        ]
      },
      {
        title: 'Tratamento de Farol',
        items: [
          { id: 'c-head-1', name: 'Recuperação de Farol', price: 180 },
          { id: 'c-head-2', name: 'Polimento de Farol', price: 100 },
        ]
      },
      {
        title: 'Higienização Interna',
        items: [
          { id: 'c-int-1', name: 'Lavagem dos Bancos', price: 180 },
          { id: 'c-int-2', name: 'Lavagem do Teto', price: 50 },
          { id: 'c-int-3', name: 'Lavagem do Carpete', price: 100 },
          { id: 'c-int-4', name: 'Americana Completo', price: 400 },
          { id: 'c-int-5', name: 'Completo (sem retirada de bancos)', price: 300 },
        ]
      },
      {
        title: 'Vidros',
        items: [
          { id: 'c-glass-1', name: 'Remoção de Chuva Ácida', price: 100 },
        ]
      }
    ]
  },
  {
    id: 'motos',
    title: 'Motos',
    iconName: 'Bike', 
    // High quality motorcycle detail shot
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
    items: [],
    subCategories: [
      {
        title: 'Lavagens & Detalhes',
        items: [
          { id: 'm-wash-1', name: 'Moto Simples', price: 50 },
          { id: 'm-wash-2', name: 'Detalhada', price: 150 },
          { id: 'm-head-1', name: 'Polimento de Farol', price: 50 },
        ]
      }
    ]
  },
  {
    id: 'home',
    title: 'Estofados Residenciais',
    iconName: 'Sofa',
    // Modern living room / sofa image
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop',
    items: [
      { id: 'h-sofa', name: 'Sofá', price: 200, isStartingPrice: true },
      { id: 'h-mattress', name: 'Colchão', price: 150 },
      { id: 'h-armchair', name: 'Poltronas', price: 80 },
      { id: 'h-chair', name: 'Cadeira', price: 40 },
    ]
  }
];

export const CONTACT_INFO = {
  phone: '(65) 98106-9894',
  instagram: '@rcar.estetica.automotiva',
  instagramUrl: 'https://instagram.com/rcar.estetica.automotiva',
  whatsappUrl: 'https://wa.me/5565981069894?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20R-Car.',
  label: 'Equipe R Car'
};