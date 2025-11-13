"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";

export const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // Add to cart logic will go here
    console.log("Added to cart:", product);
  };

  return (
    <Card className="group hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Star className="w-4 h-4 fill-white" />
              4.5
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-1 mb-2">
          {product.name}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
