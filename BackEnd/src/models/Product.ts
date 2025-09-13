import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  image: string;
  author: string;
  contactNumber: string;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
