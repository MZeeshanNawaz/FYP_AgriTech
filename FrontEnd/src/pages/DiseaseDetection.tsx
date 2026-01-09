// DiseaseDetection.tsx
import React, { useState, ChangeEvent } from "react";
import CurvyEdge from "../components/CurvyEdge";

type Top3Item = { disease: string; confidence: number };
type ApiResult = {
  error?: string;
  stage?: string;
  crop?: string;
  crop_confidence?: number; // percent 0-100
  stage1_label?: string;
  stage1_confidence?: number;
  disease?: string;
  top3?: Top3Item[];
  treatment?: { spray?: string; fertilizer?: string; advice?: string } | null;
  message?: string;
};

const clamp = (v: number) => Math.max(0, Math.min(100, v));

const DiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setResult({ error: "Please upload an image first." });
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to connect to server." });
    } finally {
      setLoading(false);
    }
  };

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
              Detect crop diseases by uploading an image. Our machine learning model will help farmers
              identify potential plant diseases and offer early prevention solutions to boost crop yield.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.dribbble.com/userupload/15954915/file/original-8a82090551c881e4ea170f035258f7bb.png"
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
              <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
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
          <h4 className="fw-semibold mb-3">Result(نتیجہ)</h4>
          <div className="p-4 border rounded bg-white shadow-sm">
            {/* Errors */}
            {result?.error && <p className="text-danger">{result.error}</p>}

            {/* If server returned message but not error */}
            {result && !result.error && (
              <>
                {/* If NonCrop or stage1 message */}
                {(result.stage1_label || result.crop === "NonCrop") && result.crop === "NonCrop" && (
                  <>
                    <p>
                      <strong>Uploaded image classified as:</strong> NonCrop
                    </p>
                    <p>
                      Confidence:{" "}
                      <strong>
                        {typeof result.stage1_confidence === "number"
                          ? clamp(result.stage1_confidence)
                          : 0}
                        %
                      </strong>
                    </p>
                    <p className="text-muted">{result.message}</p>
                  </>
                )}

                {/* If unknown crop due to low stage2 confidence */}
                {result.crop === "Unknown Crop" && (
                  <>
                    <p>
                      <strong>Crop:</strong> Unknown
                    </p>
                    <p>
                      Crop confidence: <strong>{result.crop_confidence ?? 0}%</strong>
                    </p>
                    <p className="text-muted">{result.message}</p>
                  </>
                )}

                {/* If a valid crop detected */}
                {result.crop !== "NonCrop" && result.crop !== "Unknown Crop" && (
                  <>
                    <pre className="mb-3">
🌱 Crop: {result.crop} ({result.crop_confidence ?? 0}%)
🦠 Disease: {result.disease ?? "N/A"}
                    </pre>

                    {/* TOP 3 */}
                    <h5>Top 3 Predictions (بہترین تین پیش گوئیاں)</h5>
                    {result.top3 && result.top3.length > 0 ? (
                      result.top3.map((p: Top3Item, i: number) => (
                        <div key={i} className="mb-2">
                          <small>
                            {p.disease}: {p.confidence}%
                          </small>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${clamp(p.confidence)}%` }}
                              aria-valuenow={clamp(p.confidence)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No disease predictions available.</p>
                    )}

                    <hr />

                    {/* TREATMENT */}
                    <h5>Treatment Recommendation</h5>
                    <p>
                      <b>Spray:</b> {result.treatment?.spray ?? "Not available"}
                    </p>
                    <p>
                      <b>Fertilizer:</b> {result.treatment?.fertilizer ?? "Not available"}
                    </p>
                    <p>
                      <b>Advice:</b> {result.treatment?.advice ?? "Not available"}
                    </p>

                    <hr />

                    {/* URDU TRANSLATION */}
                    <h5>بیماری اور علاج</h5>
                    <p>
                      <b>فصل:</b> {result.crop}
                    </p>
                    <p>
                      <b>بیماری:</b> {result.disease}
                    </p>
                    <p>
                      <b>سپرے:</b> {result.treatment?.spray ?? "موجود نہیں"}
                    </p>
                    <p>
                      <b>کھاد:</b> {result.treatment?.fertilizer ?? "موجود نہیں"}
                    </p>
                    <p>
                      <b>مشورہ:</b> {result.treatment?.advice ?? "موجود نہیں"}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiseaseDetection;