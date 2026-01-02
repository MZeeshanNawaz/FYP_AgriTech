import React from "react";
import type { ProductGridProps } from "../types";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC<ProductGridProps> = ({ products = [], onDelete, search = "" }) => {
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="row g-3">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((prod) => (
          <div key={prod._id ?? prod.id?.toString()} className="col-12 col-md-4">
            <ProductCard product={prod} onDelete={onDelete} />
          </div>
        ))
      ) : (
        <p className="text-center mt-4 text-muted">No products found.</p>
      )}
    </div>
  );
};

export default ProductGrid;
