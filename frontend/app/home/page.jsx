import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductsSection } from "@/components/ProductsSection";
import { Footer } from "@/components/Footer";

// Server-side data fetching
async function getProducts() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseURL}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const HomePage = async () => {
  // Fetch products on the server
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <ProductsSection products={products} />
      <Footer />
    </div>
  );
};

export default HomePage;
