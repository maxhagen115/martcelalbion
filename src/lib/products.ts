import { products } from "@/data/products";
export const getAllProducts = () => products;
export const getByCategory = (c: "paintings" | "photos") => products.filter(p => p.category === c);
export const getBySlug = (slug: string) => products.find(p => p.slug === slug) ?? null;
