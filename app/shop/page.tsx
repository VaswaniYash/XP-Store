import { ProductsGrid } from "@/components/products-grid";
import { ProductFilters } from "@/components/product-filters";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shop All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <ProductFilters />
          </aside>
          
          <main className="flex-1">
            <ProductsGrid />
          </main>
        </div>
      </div>
    </div>
  );
}
