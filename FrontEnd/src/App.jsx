import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import TopStripe from './components/TopStripe'
import ContactStrip from './components/ContactStrip'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import SellCrop from './components/SellCrop'
import ToastsContainer from './components/ToastsContainer'

import localProducts from './data/products.jsx'

export default function App() {
  const [dbProducts, setDbProducts] = useState([])
  const [toasts, setToasts] = useState([])
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [search, setSearch] = useState("")              // 🔍 search state

  // Load DB products
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products')
        setDbProducts(data)
      } catch (e) {
        addToast({ title: 'Error', message: 'Failed to load products', type: 'danger' })
        console.error(e)
      }
    })()
  }, [])

  // Toasts (top-right)
  function addToast({ title, message, type = 'success', timeout = 3500 }) {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, title, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), timeout)
  }
  function removeToast(id) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Handle email subscribe
  function handleSubscribe() {
    if (!subscribeEmail.trim()) {
      addToast({ title: 'Error', message: 'Please enter an email address', type: 'danger' })
      return
    }
    addToast({ title: 'Subscribed', message: `You subscribed with ${subscribeEmail}`, type: 'success' })
    setSubscribeEmail("")
  }

  // When a new DB item is created
  function handleCreated(newItem) {
    setDbProducts(prev => [newItem, ...prev])
    addToast({ title: 'Created', message: `${newItem.title || newItem.cropType} listed successfully`, type: 'success' })
  }

  // Delete a DB item
  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`)
      setDbProducts(prev => prev.filter(p => p._id !== id))
      addToast({ title: 'Deleted', message: 'Listing removed', type: 'success' })
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to delete', type: 'danger' })
      console.error(e)
    }
  }

  // Merge DB (first) + static
  const products = useMemo(() => {
    const normalizedLocal = localProducts.map(p => ({
      _id: `local-${p.id ?? p.title}`,
      title: p.title,
      price: p.price,
      author: p.author,
      image: p.image,
      contactNumber: p.contactNumber ?? ''
    }))
    return [...dbProducts, ...normalizedLocal]
  }, [dbProducts])

  return (
    <>
      <ToastsContainer toasts={toasts} removeToast={removeToast} />
      <TopStripe />
      <ContactStrip />

      {/* pass search props to Navbar */}
      <Navbar search={search} setSearch={setSearch} />

      <Hero />

      <SellCrop onCreated={handleCreated} showToast={addToast} />

      <main className="py-2">
        <div className="container">
          {/* pass search down to filter products */}
          <ProductGrid products={products} onDelete={handleDelete} search={search} />
        </div>
      </main>

      <Footer
        subscribeEmail={subscribeEmail}
        setSubscribeEmail={setSubscribeEmail}
        handleSubscribe={handleSubscribe}
      />
    </>
  )
}
