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
  iconName: string; // Using Lucide icon names as strings
  items: ServiceItem[];
  subCategories?: {
    title: string;
    items: ServiceItem[];
  }[];
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum GeminiModel {
  FLASH_LITE = 'gemini-flash-lite-latest',
  FLASH_IMAGE = 'gemini-2.5-flash-image',
}