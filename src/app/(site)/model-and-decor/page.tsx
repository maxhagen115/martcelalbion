'use client';

import { useState } from "react";
import Container from "@/components/layout/container";
import ProductCard from "@/components/products/product-card";
import ProductModal from "@/components/products/product-modal";
import { getByCategory } from "@/lib/products";

export default function ModelAndDecorPage() {
  const items = getByCategory("decor");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleProductClick = (index: number) => {
    setCurrentProductIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1);
    } else if (direction === 'next' && currentProductIndex < items.length - 1) {
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };

  return (
    <Container>
      {/* Header */}
      <header className="py-10 md:py-14">
        <h1 className="font-serif text-3xl md:text-4xl">Model and Decor Design</h1>
        <p className="mt-3 max-w-2xl text-neutral-500">
          Discover architectural models, interior design elements, and decorative pieces that transform spaces.
        </p>
      </header>

      {/* Grid */}
      {items.length > 0 ? (
        <section className="pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((p, index) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                index={index}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </section>
      ) : (
        <EmptyState />
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        products={items}
        currentProductIndex={currentProductIndex}
        onNavigate={handleNavigate}
      />
    </Container>
  );
}

/** Simple empty state for when there are no decor items yet */
function EmptyState() {
  return (
    <div className="py-24 text-center text-neutral-500">
      <p>No decor items published yet.</p>
      <p className="mt-2">
        Add items to <code className="px-1 py-0.5 rounded bg-gray-100">src/data/products.ts</code> with{" "}
        <code className="px-1 py-0.5 rounded bg-gray-100">category: "decor"</code>.
      </p>
    </div>
  );
}
