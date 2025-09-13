import React from "react";
import type { Product, Toast } from "../types/index";
import ProductGrid from "../components/ProductGrid";
import SellCrop from "../components/SellCrop";
// If your Hero component is .jsx, TypeScript should still accept import (or rename Hero to .tsx)
import Hero from "../components/HeroMarket";

export interface MarketplaceProps {
  products?: Product[]; // merged static + db from App
  search?: string;
  onDelete?: (id: string) => void;
  onCreated?: (p: Product) => void;
  showToast?: (t: Toast) => void;
}

export default function Marketplace({
  products = [],
  search = "",
  onDelete,
  onCreated,
  showToast,
}: MarketplaceProps) {
  // defensive logging
  console.log("Marketplace received products:", products);

  return (
    <>
      <Hero />
      <SellCrop onCreated={onCreated} showToast={showToast} />
      <main className="py-2">
        <div className="container">
          <ProductGrid products={products} search={search} onDelete={onDelete} />
        </div>
      </main>
    </>
  );
}
