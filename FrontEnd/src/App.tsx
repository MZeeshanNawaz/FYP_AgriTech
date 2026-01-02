import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import TopStripe from "./components/TopStripe";
import ContactStrip from "./components/ContactStrip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastsContainer from "./components/ToastsContainer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Services from "./pages/services";
import Blog from "./pages/Blog";
import Weather from "./pages/WeatherForecasting";
import ChatBot from "./pages/AgriChatbot";
import DiseaseDetection from "./pages/DiseaseDetection";

import ProtectedRoute from "./routes/ProtectedRoute";
import localProducts from "./data/products";
import { Product } from "./types";

interface Toast {
  id: number;
  title: string;
  message: string;
  type?: "success" | "danger" | "info" | "warning";
}

function AppContent() {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const products: Product[] = [...localProducts, ...dbProducts];

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setDbProducts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const addToast = ({ title, message, type = "success", timeout = 3000 }: any) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, timeout);
  };

  return (
    <>
      {!hideLayout && (
        <>
          <TopStripe />
          <ContactStrip />
          <Navbar search={search} setSearch={setSearch} />
        </>
      )}

      <ToastsContainer
        toasts={toasts}
        removeToast={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/marketplace"
            element={
              <Marketplace
                products={products}
                search={search}
                onDelete={() => {}}
                onCreated={() => {}}
                showToast={addToast}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/detect" element={<DiseaseDetection />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {!hideLayout && (
        <Footer
          subscribeEmail={subscribeEmail}
          setSubscribeEmail={setSubscribeEmail}
          handleSubscribe={() => {}}
        />
      )}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
