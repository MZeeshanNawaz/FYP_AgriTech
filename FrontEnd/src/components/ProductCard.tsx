import React from "react";
import axios from "axios";
import { ProductCardProps } from "../types/index";

export default function ProductCard({ product, onDelete, showToast }: ProductCardProps & { showToast?: any }) {
  const { title, image, price, contactNumber, author, _id } = product;
  const isDbItem = !!_id && !String(_id).startsWith("local-");

  const displayContact = contactNumber || (product as any).contact || "0301-1654141";

  let displayPrice: string;
  if (typeof price === "number") {
    displayPrice = `PKR ${(price as number).toLocaleString()}`;
  } else {
    displayPrice = price ?? "";
  }

  const handleDelete = async () => {
    if (!_id) return;

    if (!confirm("Delete this item?")) return;

    try {
      // Call backend API to delete product
      await axios.delete(`http://localhost:5000/api/products/${_id}`);

      // Update parent state
      onDelete?.(_id);

      // Show success toast
      showToast?.({
        id: Date.now(),
        title: "Deleted",
        message: `${title} has been deleted successfully.`,
        type: "success",
      });
    } catch (err) {
      console.error("Failed to delete product:", err);
      showToast?.({
        id: Date.now(),
        title: "Error",
        message: `Failed to delete ${title}.`,
        type: "danger",
      });
    }
  };

  return (
    <div className="card crop-card shadow-sm">
      <div className="crop-image-wrap">
        <img src={image} className="card-img-top" alt={title} />
        <span className="price-pill">{displayPrice}</span>

        {isDbItem && (
          <button title="Delete" className="card-admin-btn" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>

      <div className="card-body text-center pt-4">
        <div className="meta small text-muted mb-2">
          <i className="fa-regular fa-circle-user"></i>&nbsp; {author}
          <br />
          <i className="fa-solid fa-phone"></i>&nbsp; {displayContact}
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
      </div>
    </div>
  );
}
