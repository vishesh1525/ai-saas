"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadImage]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      setUploadImage(data.publicId);
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
        Social Media Image Creator
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Upload an Image
        </h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg text-white">
              Choose an image file
            </span>
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="file-input file-input-bordered w-full text-white"
          />
        </div>

        {isUploading && (
          <div className="mt-4">
            <progress className="progress progress-primary w-full"></progress>
          </div>
        )}

        {uploadImage && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Select Social Media Format
            </h2>
            <div className="form-control">
              <select
                className="select select-bordered w-full text-white bg-gray-700"
                value={selectedFormat}
                onChange={(e) =>
                  setSelectedFormat(e.target.value as SocialFormat)
                }
              >
                {Object.keys(socialFormats).map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 relative">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Preview:
              </h3>
              <div className="flex justify-center">
                <CldImage
                  width={socialFormats[selectedFormat].width}
                  height={socialFormats[selectedFormat].height}
                  src={uploadImage}
                  sizes="100vw"
                  alt="transformed image"
                  crop="fill"
                  aspectRatio={socialFormats[selectedFormat].aspectRatio}
                  gravity="auto"
                  ref={imageRef}
                  onLoad={() => setIsTransforming(false)}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="card-actions justify-end mt-8">
              <button
                className="btn btn-primary"
                onClick={handleDownload}
              >
                Download for {selectedFormat}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
