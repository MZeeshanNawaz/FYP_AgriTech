import { ReactNode } from "react";

export interface NavbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface Toast {
  id: string | number;
  title: string;
  message: string;
  type?: "success" | "danger" | "info" | "warning"; 
}

export interface ToastsContainerProps {
  toasts: Toast[];
  removeToast: (id: string | number) => void;
}

export interface CurvyEdgeProps {
  color?: string;
  className?: string;
}

export interface LayoutProps {
  children: ReactNode;
  toasts: Toast[]; 
  removeToast: ToastsContainerProps["removeToast"]; 
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  subscribeEmail: string;
  setSubscribeEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubscribe: () => void;
}

export interface Product {
  _id?: string;           // from MongoDB
  id?: number | string;   // from local products
  title: string;
  price: string;          
  image: string;
  author?: string;
  contactNumber?: string;
  cropType?: string; 
}

export interface Service {
  id: number;
  title: string;
  image: string;
}

export interface SellCropProps {
  onCreated?: (p: Product) => void;
  showToast?: (t: Toast) => void;
}

export interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
}

export interface ProductGridProps {
  products?: Product[];           
  onDelete?: (id: string) => void;
  search?: string;
}

export interface FooterProps {
  subscribeEmail: string;
  setSubscribeEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubscribe: () => void;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  img: string;
}

export interface MarketplaceProps {
  products?: Product[]; // merged static + db from App
  search?: string;
  onDelete?: (id: string) => void;
  onCreated?: (p: Product) => void;
  showToast?: (t: Toast) => void;
}