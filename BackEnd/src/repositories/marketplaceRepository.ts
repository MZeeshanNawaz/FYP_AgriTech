import Product, { IProduct } from "../databases/models/Product";

export async function findAllProducts(): Promise<IProduct[]> {
  return Product.find().sort({ createdAt: -1 }).lean();
}

export async function createProduct(payload: {
  title: string;
  price: string;
  image: string;
  author: string;
  contactNumber: string;
  cropType?: string;
}): Promise<IProduct> {
  const doc = new Product(payload);
  return doc.save();
}

export async function deleteProductById(id: string): Promise<IProduct | null> {
  return Product.findByIdAndDelete(id);
}
