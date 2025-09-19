import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toast, ToastsContainerProps } from "../types/index";
import ToastsContainer from "./ToastsContainer"
import TopStripe from "./TopStripe";
import ContactStrip from "./ContactStrip";
import { LayoutProps } from "../types/index";

const Layout: React.FC<LayoutProps> = ({
  children,
  toasts,
  removeToast,
  search,
  setSearch,
  subscribeEmail,
  setSubscribeEmail,
  handleSubscribe,
}) => {
  return (
    <>
      {/* Stripes above navbar */}
      <TopStripe />
      <ContactStrip />
      <Navbar search={search} setSearch={setSearch} />

      <main>{children}</main>

      <Footer
        subscribeEmail={subscribeEmail}
        setSubscribeEmail={setSubscribeEmail}
        handleSubscribe={handleSubscribe}
      />

      <ToastsContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default Layout;
