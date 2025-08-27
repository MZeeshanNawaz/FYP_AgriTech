import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopStripe from "./components/TopStripe";
import ContactStrip from "./components/ContactStrip";
import Navbar from "./components/Navbar";
import ToastsContainer from "./components/ToastsContainer";
import Marketplace from "./pages/Marketplace";
import Home from "./pages/Home";
import Footer from "./components/Footer";

// static fallback products
import localProducts from "./data/products";

export default function App() {
  const [dbProducts, setDbProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState([]);
  const [subscribeEmail, setSubscribeEmail] = useState("");

  // Merge static + DB products
  const products = [...localProducts, ...dbProducts];

  // Fetch DB products on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setDbProducts(data))
      .catch((err) => console.error("Failed to fetch DB products:", err));
  }, []);

  // Toast system
  const addToast = ({ title, message, type = "success", timeout = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), timeout);
  };

  // Delete product (persistent)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product from database");

      setDbProducts((prev) => prev.filter((p) => p._id !== id));
      addToast({ title: "Deleted", message: "Product removed successfully" });
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", message: "Could not delete product", type: "danger" });
    }
  };

  // Add new product
  const handleCreated = (newProduct) => {
    setDbProducts((prev) => [newProduct, ...prev]);
    addToast({ title: "Added", message: "Product added successfully" });
  };

  // Handle subscription
  const handleSubscribe = () => {
    if (!subscribeEmail.trim()) {
      addToast({ title: "Error", message: "Please enter an email address", type: "danger" });
      return;
    }
    addToast({ title: "Subscribed", message: `You subscribed with ${subscribeEmail}` });
    setSubscribeEmail("");
  };

  return (
    <>
      <TopStripe />
      <ContactStrip />
      <Navbar search={search} setSearch={setSearch} />

      <ToastsContainer
        toasts={toasts}
        removeToast={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/marketplace"
          element={
            <Marketplace
              products={products}
              search={search}
              onDelete={handleDelete}
              onCreated={handleCreated}
              showToast={addToast}
            />
          }
        />
      </Routes>

      <Footer
        subscribeEmail={subscribeEmail}
        setSubscribeEmail={setSubscribeEmail}
        handleSubscribe={handleSubscribe} // pass toast-enabled handler
      />
    </>
  );
}
