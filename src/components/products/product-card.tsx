import { useState } from "react";
import LazyImage from "./lazy-image";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  onProductClick: (index: number) => void;
}

export default function ProductCard({ product, index, onProductClick }: ProductCardProps) {
  const img = product.images[0];
  const isPriority = index < 4; // First 4 images load immediately
  
  return (
    <div className="group block cursor-pointer" onClick={() => onProductClick(index)}>
      <div className="relative overflow-hidden">
        <LazyImage
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(min-width:1024px) 33vw, 100vw"
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          priority={isPriority}
        />
        {/* Hover overlay with title */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <h3 className="font-serif text-xl text-white text-center drop-shadow-lg">
            {product.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
