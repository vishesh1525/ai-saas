"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert("File size is too large");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/videouploads", formData);
      if (response.status === 200) {
        alert("Video uploaded successfully!");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-white animate-fadeIn">
        Upload Video
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 animate-slideUp">
        <div>
          <label className="label text-white">
            <span className="label-text text-lg text-white">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            required
          />
        </div>
        <div>
          <label className="label text-white">
            <span className="label-text text-lg text-white">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            rows={4}
          />
        </div>
        <div>
          <label className="label text-white">
            <span className="label-text text-lg text-white">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          disabled={isUploading}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⏳</span> Uploading...
            </span>
          ) : (
            "Upload Video"
          )}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
