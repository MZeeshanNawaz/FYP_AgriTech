import React, { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import SellCrop from "../components/SellCrop";
import Hero from "../components/HeroMarket";
import { MarketplaceProps, Product, Toast } from "../types/index";
import axios from "axios";

const Marketplace: React.FC<MarketplaceProps> = ({
  products = [],
  search = "",
  onCreated,
  showToast,
}) => {
  // Local state for products
  const [productList, setProductList] = useState<Product[]>(products);

  // Fetch from backend if no initial products
  useEffect(() => {
    if (products.length === 0) {
      axios
        .get<Product[]>("http://localhost:5000/api/products")
        .then((res) => setProductList(res.data))
        .catch((err) => {
          console.error(err);
          showToast?.({
            id: Date.now().toString(),
            title: "Error",
            message: "Failed to load products",
            type: "danger",
          });
        });
    }
  }, [products, showToast]);

  // When a new product is created via SellCrop
  const handleProductCreated = (newProduct: Product) => {
    setProductList((prev) => [newProduct, ...prev]);
    showToast?.({
      id: Date.now().toString(),
      title: "Success",
      message: `${newProduct.title} has been listed successfully.`,
      type: "success",
    });
    onCreated?.(newProduct); 
  };

  // Delete a product
  const handleDelete = async (id: string, title: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      setProductList((prev) => prev.filter((p) => p._id !== id));

      // Show success toast
      showToast?.({
        id: Date.now().toString(),
        title: "Deleted",
        message: `${title} has been deleted successfully.`,
        type: "success",
      });
    } catch (err) {
      console.error(err);
      showToast?.({
        id: Date.now().toString(),
        title: "Error",
        message: `Failed to delete ${title}`,
        type: "danger",
      });
    }
  };

  return (
    <>
      <Hero />
      <SellCrop onCreated={handleProductCreated} showToast={showToast} />
      <main className="py-2">
        <div className="container">
          <ProductGrid
            products={productList}
            search={search}
            onDelete={(id: string) => {
              // Find product title for toast
              const prod = productList.find((p) => p._id === id);
              if (prod) handleDelete(id, prod.title);
            }}
          />
        </div>
      </main>
    </>
  );
};

export default Marketplace;
