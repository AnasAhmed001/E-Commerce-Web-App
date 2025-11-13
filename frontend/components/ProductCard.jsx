"use client";

import Link from "next/link";
import Image from "next/image";
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
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking Add to Cart
  };

  return (
    <Link href={`/product/${product._id}`}>
      <Card className="group hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2">
              <div className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                4.5
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <CardTitle className="text-base font-semibold line-clamp-1 mb-1">
            {product.name}
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${product.price}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button className="w-full" size="default" onClick={handleAddToCart}>
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
