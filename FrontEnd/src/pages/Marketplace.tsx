import React from "react";
import ProductGrid from "../components/ProductGrid";
import SellCrop from "../components/SellCrop";
import Hero from "../components/HeroMarket";
import { MarketplaceProps } from "../types/index"; 

const Marketplace = ({
  products = [],
  search = "",
  onDelete,
  onCreated,
  showToast,
}: MarketplaceProps) => {
  console.log("Marketplace received products:", products);

  return (
    <>
      <Hero />
      <SellCrop onCreated={onCreated} showToast={showToast} />
      <main className="py-2">
        <div className="container">
          <ProductGrid
            products={products}
            search={search}
            onDelete={onDelete}
          />
        </div>
      </main>
    </>
  );
};

export default Marketplace;
