import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";

export interface ProductGridProps {
  products?: Product[];           
  onDelete?: (id: string) => void;
  search?: string;
}

export default function ProductGrid({ products = [], onDelete, search = "" }: ProductGridProps) {
  const q = search?.trim().toLowerCase() ?? "";

  const list = React.useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!q) return products;
    return products.filter((p) => {
      const haystack = [
        p.title,
        p.cropType,
        p.author,
        p.price?.toString(),
        p.contactNumber,
        (p as any).contact,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, q]);

  if (!list.length) {
    return <div className="text-center py-5">No products found</div>;
  }

  return (
    <div className="row g-4">
      {list.map((p) => (
        <div className="col-12 col-md-6 col-lg-4" key={p._id || p.id}>
          <ProductCard product={p} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
