import React, { useState, ChangeEvent } from "react"
import CurvyEdge from "../components/CurvyEdge"

const DiseaseDetection = () => {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)

      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result as string)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setResult("❌ Please upload an image first.")
      return
    }

    setLoading(true)
    setResult("⏳ Processing image...")

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.error) {
        setResult(`❌ ${data.error}`)
      } else {
        setResult(
          `🌱 Crop: ${data.crop} (${data.crop_confidence}%)\n` +
          `🦠 Disease: ${data.disease} (${data.disease_confidence}%)`
        )
      }
    } catch (error) {
      setResult("❌ Failed to connect to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="disease-page">
      {/* Hero Section */}
      <header className="hero hero-section position-relative">
        <div className="hero-overlay" />
        <div className="container hero-content text-center text-white">
          <small className="text-uppercase breadcrumb">Home / DiseaseDetection</small>
          <h1 className="display-5 fw-bold">Disease Detection</h1>
          <p className="lead text-light mt-3 mx-auto" style={{ maxWidth: "700px" }}>
            Upload a leaf image and let our AI model detect possible crop diseases instantly.
          </p>
        </div>

        <CurvyEdge color="rgba(255, 255, 255, 1)" />
      </header>

      {/* Description Section */}
      <section className="container py-5 text-center text-md-start">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="text-muted">
              Detect crop diseases by uploading an image. Our machine learning model
              will help farmers identify potential plant diseases and offer early
              prevention solutions to boost crop yield.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.dribbble.com/userupload/15954915/file/original-8a82090551c881e4ea170f035258f7bb.png?resize=1200x900&vertical=center"
              alt="Leaf closeup"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section py-5 text-center text-white">
        <div className="container">
          <h4 className="text-warning fw-semibold">Agriculture Innovation</h4>
          <h2 className="fw-bold mb-4">Detect by Uploading an Image</h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm text-dark upload-form mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="fileUpload"
                onChange={handleFileChange}
              />
            </div>

            {image && (
              <div className="preview-container mb-3">
                <img
                  src={image}
                  alt="Preview"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                />
                <p className="mt-2 small text-muted">{fileName}</p>
              </div>
            )}

            <button type="submit" className="btn btn-success px-4" disabled={loading}>
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </section>

      {/* Result Section */}
      <section className="result-section py-5 bg-light">
        <div className="container">
          <h4 className="fw-semibold mb-3">Result</h4>
          <div className="p-4 border rounded bg-white shadow-sm">
            {result ? (
              <pre className="mb-0">{result}</pre>
            ) : (
              <p className="text-muted mb-0">
                Upload an image and click Continue to view detection results here.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DiseaseDetection
