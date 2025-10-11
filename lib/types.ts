export type Variant = { label: string; price: number; sku?: string };
export type Product = {
  id: string;
  slug: string;
  title: string;
  images: string[];
  description?: string;
  category?: string;
  variants: Variant[];
  badges?: string[];
};