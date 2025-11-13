import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductsSection } from "@/components/ProductsSection";
import { Footer } from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <HeroCarousel />
      <ProductsSection />
      <Footer />
    </div>
  );
};

export default HomePage;