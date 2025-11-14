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
        <CardContent className="p-2">
          <CardTitle className="text-xl font-bold line-clamp-2 mb-2 leading-tight tracking-tight">
            {product.name}
          </CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-baseline justify-between mt-auto">
            <div>
              <span className="text-lg font-medium text-foreground tracking-tight">
                ${product.price}
              </span>
              <span className="text-xs text-muted-foreground ml-1">USD</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full font-semibold" size="default" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
