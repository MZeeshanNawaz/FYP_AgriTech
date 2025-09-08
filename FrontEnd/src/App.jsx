import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import TopStripe from "./components/TopStripe";
import ContactStrip from "./components/ContactStrip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastsContainer from "./components/ToastsContainer";

import Home from "./pages/Home";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Register from "./pages/Register";   

// static fallback products
import localProducts from "./data/products";

function AppContent() {
  const location = useLocation();

  // pages where we want to hide global layout
  const hideLayoutRoutes = ["/login", "/register"]; 
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  // ----- state kept from your previous setup -----
  const [dbProducts, setDbProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState([]);
  const [subscribeEmail, setSubscribeEmail] = useState("");

  // merge local + db products
  const products = [...localProducts, ...dbProducts];

  // fetch DB products (won't crash if backend is down)
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setDbProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to fetch DB products:", err));
  }, []);

  // toast helpers
  const addToast = ({ title, message, type = "success", timeout = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), timeout);
  };

  // persistent delete
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

  // add created item into DB list
  const handleCreated = (newProduct) => {
    setDbProducts((prev) => [newProduct, ...prev]);
    addToast({ title: "Added", message: "Product added successfully" });
  };

  // footer subscribe
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
      {!hideLayout && (
        <>
          <TopStripe />
          <ContactStrip />
          {/* pass search props because Navbar uses them */}
          <Navbar search={search} setSearch={setSearch} />
        </>
      )}

      {/* toast notifications */}
      <ToastsContainer
        toasts={toasts}
        removeToast={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   
        <Route path="*" element={<Home />} />
      </Routes>

      {!hideLayout && (
        <Footer
          subscribeEmail={subscribeEmail}
          setSubscribeEmail={setSubscribeEmail}
          handleSubscribe={handleSubscribe}
        />
      )}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
