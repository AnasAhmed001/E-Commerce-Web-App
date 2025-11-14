import { ShoppingBag } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-4 mt-12 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xl font-bold">ShopHub</span>
        </div>
        <p className="text-muted-foreground">© 2025 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};
