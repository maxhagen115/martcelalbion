'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Mail } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentProductIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function ProductModal({
  isOpen,
  onClose,
  products,
  currentProductIndex,
  onNavigate
}: ProductModalProps) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const currentProduct = products[currentProductIndex];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !currentProduct) return null;

  const canGoPrev = currentProductIndex > 0;
  const canGoNext = currentProductIndex < products.length - 1;

  return (
    <>
      {/* Main Product Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-serif">{currentProduct.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/3 p-6">
              <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={currentProduct.images[0].src}
                  alt={currentProduct.images[0].alt}
                  width={currentProduct.images[0].width}
                  height={currentProduct.images[0].height}
                  className="w-full h-auto object-contain"
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/3 p-6 border-l">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{currentProduct.description}</p>
                </div>

                {/* Attributes */}
                {currentProduct.attributes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      {currentProduct.attributes.size && (
                        <div>Size: {currentProduct.attributes.size}</div>
                      )}
                      {currentProduct.attributes.medium && (
                        <div>Medium: {currentProduct.attributes.medium}</div>
                      )}
                      {currentProduct.attributes.edition && (
                        <div>Edition: {currentProduct.attributes.edition}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Purchase Button */}
                <button
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Request Purchase</span>
                </button>

                {/* Navigation Info */}
                <div className="text-center text-sm text-gray-500">
                  {currentProductIndex + 1} of {products.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {canGoPrev && (
            <button
              onClick={() => onNavigate('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canGoNext && (
            <button
              onClick={() => onNavigate('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Purchase Request Modal */}
      {isPurchaseModalOpen && (
        <PurchaseRequestModal
          product={currentProduct}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      )}
    </>
  );
}

// Purchase Request Modal Component
function PurchaseRequestModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          productTitle: product.title,
          productSlug: product.slug,
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send request. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (submitStatus === 'success') {
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Request Sent!</h3>
            <p className="text-gray-600">
              Your purchase request for {product.title} has been sent successfully. We&rsquo;ll get back to you soon.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Request Purchase</h3>
          <p className="text-gray-600 mt-2">
            Interested in &quot;{product.title}&quot;? Send us a message and We&rsquo;ll get back to you.
          </p>
        </div>

        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange('name')}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange('email')}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={handleInputChange('message')}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Tell us about your interest in this piece..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
