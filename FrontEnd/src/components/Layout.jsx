import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ToastsContainer from "./ToastsContainer"
import TopStripe from "./TopStripe"
import ContactStrip from "./ContactStrip"

export default function Layout({
  children,
  toasts,
  removeToast,
  search,
  setSearch,
  subscribeEmail,
  setSubscribeEmail,
  handleSubscribe
}) {
  return (
    <>
      {/* ✅ Stripes above navbar */}
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
  )
}
