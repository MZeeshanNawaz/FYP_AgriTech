import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, onDelete, search = '' }) {
  const q = search.trim().toLowerCase()

  const list = React.useMemo(() => {
    if (!Array.isArray(products)) return []
    if (!q) return products
    return products.filter(p => {
      const haystack = [
        p.title,
        p.cropType,        // some DB items may use cropType instead of title
        p.author,
        p.price?.toString()
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [products, q])

  if (!list.length) {
    return <div className="text-center py-5">No products found</div>
  }

  return (
    <div className="row g-4">
      {list.map(p => (
        <div className="col-12 col-md-6 col-lg-4" key={p._id || p.id}>
          <ProductCard product={p} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}
