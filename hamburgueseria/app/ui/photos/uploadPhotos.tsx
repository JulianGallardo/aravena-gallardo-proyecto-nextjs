import React, { useState, ChangeEvent } from "react";

const UploadPhotos: React.FC = () => {
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
    <div className="max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md border ">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Image</h2>
      <div className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
        />
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <label className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-200">
          <span className="text-gray-600">{image ? "File Selected" : "Select a file"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
        <button
          className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white font-bold`}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {imageUrl && (
        <div className="mt-6 text-center">
          <p className="mb-4">Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-full max-w-xs mx-auto rounded" />
        </div>
      )}
    </div>
  );
};

export default UploadPhotos;
