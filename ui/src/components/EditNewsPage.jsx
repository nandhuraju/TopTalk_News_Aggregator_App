import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditNewsPage = () => {
  const { id } = useParams(); // Get the news ID from the route parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [news, setNews] = useState({
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing news details
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const res = await axios.get(`/api/user/customNews/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setNews(res.data);
        } else {
          setError("Error fetching news details");
        }
      } catch (err) {
        setError(`Error fetching news details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await axios.put(`/api/user/editNews/custom/${id}`, news, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        toast.success("News article updated successfully");
        navigate("/home"); 
      } else {
        setError("Error updating news article");
      }
    } catch (err) {
      setError(`Error updating news article: ${err.message}`);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await axios.delete(`/api/user/deleteNews/custom/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        toast.success("News article deleted successfully");
        navigate("/home"); 
      } else {
        setError("Error deleting news article");
      }
    } catch (err) {
      setError(`Error deleting news article: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Edit News Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={news.title}
            onChange={(e) => setNews({ ...news, title: e.target.value })}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={news.description}
            onChange={(e) => setNews({ ...news, description: e.target.value })}
            className="mt-1 block w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium">
            URL
          </label>
          <input
            type="text"
            id="url"
            value={news.url}
            onChange={(e) => setNews({ ...news, url: e.target.value })}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="urlToImage" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="urlToImage"
            value={news.urlToImage}
            onChange={(e) => setNews({ ...news, urlToImage: e.target.value })}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={news.category}
            onChange={(e) => setNews({ ...news, category: e.target.value })}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update News
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete News
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNewsPage;
