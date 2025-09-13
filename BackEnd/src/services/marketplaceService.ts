import {
  findAllProducts,
  createProduct,
  deleteProductById,
} from "../repositories/marketplaceRepository";

export async function getProductsService() {
  return await findAllProducts();
}

export async function createProductService(data: {
  title: string;
  price: string;
  image: string;
  author: string;
  contactNumber: string;
  cropType?: string;
}) {
  return await createProduct(data);
}

export async function deleteProductService(id: string) {
  return await deleteProductById(id);
}
