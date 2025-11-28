export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  isStartingPrice?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string; 
  items: ServiceItem[];
  subCategories?: {
    title: string;
    items: ServiceItem[];
  }[];
  image: string;
}