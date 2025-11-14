import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductBreadcrumb } from "@/components/ProductBreadcrumb";
import { notFound } from "next/navigation";

// Server-side data fetching for single product
async function getProduct(id) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseURL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const ProductPage = async ({ params }) => {
  // Await params in Next.js 15+
  const { id } = await params;
  const product = await getProduct(id);

  // Show 404 if product not found
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <ProductBreadcrumb productName={product.name} />
      <ProductDetails product={product} />
      <Footer />
    </div>
  );
};

export default ProductPage;
