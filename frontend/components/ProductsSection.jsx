"use client";

import { ProductCard } from "./ProductCard";
import { ShoppingBag } from "lucide-react";

export const ProductsSection = ({ products = [] }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-2 text-center">
            Discover our best products
          </p>
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
            No products available
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Check back later for new products
          </p>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
