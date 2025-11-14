"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity });
    // Add to cart logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Thumbnail images - Currently showing same image, you can add more images later */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedImage(product.image)}
              className="relative w-20 h-20 overflow-hidden rounded-lg border-2 border-primary"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-base font-medium text-muted-foreground">
                4.5 out of 5
              </span>
              <span className="text-sm text-muted-foreground">
                (124 reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b py-6">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-5xl font-extrabold text-primary tracking-tight">
                ${product.price}
              </span>
              <span className="text-2xl text-muted-foreground line-through font-medium">
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className="bg-red-500 text-white px-3 py-1.5 rounded-md text-base font-bold">
                17% OFF
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Inclusive of all taxes</p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-foreground tracking-tight">
              Description
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Quantity
            </h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                className="h-12 w-12"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <span className="text-2xl font-bold w-16 text-center text-foreground">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="h-12 w-12"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              size="lg"
              className="flex-1 text-lg font-bold py-7"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="py-7 px-6">
              <Heart className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="lg" className="py-7 px-6">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <Truck className="w-7 h-7 text-primary mt-0.5" />
                <div>
                  <p className="text-base font-bold text-foreground mb-1">
                    Free Shipping
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-7 h-7 text-primary mt-0.5" />
                <div>
                  <p className="text-base font-bold text-foreground mb-1">
                    Secure Payment
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    100% secure payment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RefreshCw className="w-7 h-7 text-primary mt-0.5" />
                <div>
                  <p className="text-base font-bold text-foreground mb-1">
                    Easy Returns
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    30 days return policy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
