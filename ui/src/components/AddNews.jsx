import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    category: "general",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated");
        return;
      }

      const res = await axios.post("/api/user/addNews", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        toast.success("Custom news added successfully");
        setFormData({
          title: "",
          description: "",
          url: "",
          urlToImage: "",
          category: "general",
        });
      } else {
        setMessage("Failed to add custom news");
      }
    } catch (error) {
      console.error("Error adding custom news:", error);
      setMessage("Failed to add custom news");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Add Custom News</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">URL to Image</label>
          <input
            type="url"
            name="urlToImage"
            value={formData.urlToImage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default AddNews;
