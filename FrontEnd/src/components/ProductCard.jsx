import React from 'react'

export default function ProductCard({ product, onDelete }) {
  const { title, image, price, contactNumber, author, _id } = product
  const isDbItem = _id && !String(_id).startsWith('local-')

  return (
    <div className="card crop-card shadow-sm">
      <div className="crop-image-wrap">
        <img src={image} className="card-img-top" alt={title} />
        <span className="price-pill">{price}</span>

        {isDbItem && (
          <button
            title="Delete"
            className="card-admin-btn"
            onClick={() => {
              if (confirm('Delete this item?')) onDelete?.(_id)
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>

      <div className="card-body text-center pt-4">
        <div className="meta small text-muted mb-2">
          <i className="fa-regular fa-circle-user"></i>&nbsp; {author}<br></br>
          <i className="fa-solid fa-phone"></i>&nbsp; {contactNumber || '0301-1654141'}
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
      </div>
    </div>
  )
}
