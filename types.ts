export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  isStartingPrice?: boolean;
}

export interface SubCategory {
  title: string;
  items: ServiceItem[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  image: string;
  items: ServiceItem[];
  subCategories?: SubCategory[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum GeminiModel {
  FLASH_LITE = 'gemini-2.5-flash-lite-latest',
  FLASH_IMAGE = 'gemini-2.5-flash-image',
}