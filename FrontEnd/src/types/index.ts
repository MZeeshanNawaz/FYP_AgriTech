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
  _id?: string; // DB product
  id?: string | number; // Local product
  title: string;
  price: string;
  image: string;
  author: string;
  contactNumber: string;
  cropType?: string; 
}

