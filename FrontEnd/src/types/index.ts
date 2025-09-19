// central types used by marketplace components
export type ToastType = "success" | "danger" | "info" | "warning";

export interface Toast {
  title: string;
  message: string;
  type?: ToastType;
  timeout?: number;
}

// types/Product.ts
export interface Product {
  _id?: string;           // from MongoDB
  id?: number | string;   // from local products
  title: string;
  price: string;          // always string ("PKR 2,500")
  image: string;
  author?: string;
  contactNumber?: string;
}


