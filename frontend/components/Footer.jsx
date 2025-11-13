import { ShoppingBag } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xl font-bold">ShopHub</span>
        </div>
        <p className="text-gray-400">© 2025 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};
