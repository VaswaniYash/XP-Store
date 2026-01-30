import { ProductsGrid } from "@/components/products/products-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import { Suspense } from "react";

function ShopContent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      
      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-border/50 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
        <div className="absolute inset-0 bg-[url('/Images/slide-1.webp')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            XP STORE <span className="text-primary">COLLECTION</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our curated selection of premium consoles, games, and accessories. 
            Level up your setup with the best gear in the industry.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex-1">
        
        {/* Breadcrumb & Sort Bar (Mobile hidden) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
           <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              <span className="hover:text-primary cursor-pointer">Home</span> <span className="mx-2">/</span> <span className="font-medium text-foreground">Shop</span>
           </div>
           <div className="text-sm font-medium">
             Showing all products
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="lg:sticky lg:top-24">
               <ProductFilters />
            </div>
          </aside>
          
          {/* Main Content - Grid */}
          <main className="flex-1 min-h-[600px]">
            <ProductsGrid />
          </main>
        </div>
      </div>
      
      <SiteFooter />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
