import React from "react"
import Hero from "../components/Hero"
import ProductGrid from "../components/ProductGrid"
import SellCrop from "../components/SellCrop"

export default function Marketplace({ products, search, onDelete, onCreated, showToast }) {
  console.log("Marketplace received products:", products)

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
  )
}
