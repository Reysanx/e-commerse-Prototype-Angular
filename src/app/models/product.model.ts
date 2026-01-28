export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  specs: Record<string, string>;
  stock: number;
  isNew?: boolean;
  discount?: number;
}

export const CATEGORIES = [
  'Smartphones',
  'Portátiles',
  'Tablets',
  'Audio',
  'Televisores',
  'Electrodomésticos',
  'Fotografía',
  'Accesorios',
] as const;

export type Category = typeof CATEGORIES[number];