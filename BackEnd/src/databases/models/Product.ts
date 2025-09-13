import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: string; 
  image: string;
  author: string;
  contactNumber: string;
  cropType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    contactNumber: { type: String, required: true },
    cropType: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
