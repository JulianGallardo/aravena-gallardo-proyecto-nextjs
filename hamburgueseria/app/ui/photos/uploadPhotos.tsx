import React, { useState, ChangeEvent } from "react";

const   UploadPhotos: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (image && productId && name) {
      setLoading(true);
      const res = await fetch("/api/images", {
        method: "POST",
        body: JSON.stringify({ data: image, publicId: `${productId}-${name}` }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setImageUrl(data.url);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen flex flex-col">
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && (
        <div>
          <p>Uploaded Image: {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default UploadPhotos;
