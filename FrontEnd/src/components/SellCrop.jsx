import React, { useMemo, useState } from 'react'
import axios from 'axios'

const IMAGE_MAP = {
  corn: 'https://cdn.prod.website-files.com/5ec959f99359c2ff953a4353/649cd83a6d9e586490d25fec_market-corn.jpg',
  rice: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zHT1yn42JQ_mQ0oSP7vXuDwvEAeZj_2-XQ&s',
  wheat: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCZ8I2DKIrzZtkFEJvNCUoob_AzgTbLKLiw&s'
}

export default function SellCrop({ onCreated, showToast }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [author, setAuthor] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [cropType, setCropType] = useState('Corn')

  const previewImage = useMemo(() => {
    const key = String(cropType || '').toLowerCase()
    return IMAGE_MAP[key] || 'https://via.placeholder.com/600x360?text=Preview'
  }, [cropType])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title || !price || !author || !contactNumber || !cropType) {
      showToast?.({ title: 'Error', message: 'Please fill all fields.', type: 'danger' })
      return
    }
    try {
      const { data } = await axios.post('http://localhost:5000/api/products', {
        title, price, author, contactNumber, cropType
      })
      onCreated?.(data)
      setTitle(''); setPrice(''); setAuthor(''); setContactNumber(''); setCropType('Corn')

      const modalEl = document.getElementById('sellCropModal')
      if (modalEl && window.bootstrap) {
        const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl)
        modal.hide()
      }
    } catch (err) {
      console.error(err)
      showToast?.({ title: 'Error', message: 'Failed to list item.', type: 'danger' })
    }
  }

  return (
    <>
      <div className="container mb-4 d-flex justify-content-center">
        <button className="btn btn-success fw-semibold" data-bs-toggle="modal" data-bs-target="#sellCropModal">
          <i className="fa-solid fa-leaf me-2"></i> Want to sell your crop
        </button>
      </div>

      <div className="modal fade" id="sellCropModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Sell your crop</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Corn Premium" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Price / 40 Kg</label>
                    <input className="form-control" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., PKR 3,200" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Author / Seller</label>
                    <input className="form-control" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Your Name" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Contact Number</label>
                    <input className="form-control" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="0301-1111111" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Crop Type</label>
                    <select className="form-select" value={cropType} onChange={e => setCropType(e.target.value)}>
                      <option>Corn</option>
                      <option>Rice</option>
                      <option>Wheat</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Image (auto-chosen)</label>
                    <div className="d-flex align-items-center gap-3">
                      <img src={previewImage} alt="preview" style={{ width: 120, height: 70, objectFit: 'cover', borderRadius: 6 }} />
                      <small className="text-muted">Image is selected from the Crop Type.</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
