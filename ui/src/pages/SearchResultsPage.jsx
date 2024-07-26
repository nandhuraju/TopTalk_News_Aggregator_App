import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SearchResultsPage = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchResults = async (query) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data.articles);
    } catch (err) {
      setError(`Error fetching search results: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/user/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarkedArticles(res.data.bookmarks);
    } catch (err) {
      setError(`Error fetching bookmarks: ${err.message}`);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetchSearchResults(query);
      fetchBookmarks();
    }
  }, [location.search]);

  const addToBookmark = async (article) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/user/bookmark",
        { article },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookmarkedArticles((prev) => [...prev, article]);
      toast.success("Article bookmarked successfully");
    } catch (err) {
      setError(`Error bookmarking article: ${err.message}`);
    }
  };

  const removeFromBookmark = async (article) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/api/user/bookmark", {
        headers: { Authorization: `Bearer ${token}` },
        data: { article },
      });
      setBookmarkedArticles((prev) =>
        prev.filter((a) => a.url !== article.url)
      );
      toast.success("Article removed from bookmarks");
    } catch (err) {
      setError(`Error removing bookmark: ${err.message}`);
    }
  };

  const isBookmarked = (article) =>
    bookmarkedArticles.some((a) => a.url === article.url);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Search Results</h1>
      {articles.length === 0 ? (
        <p className="text-center">No search results found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                  {isBookmarked(article) ? (
                    <button
                      onClick={() => removeFromBookmark(article)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Remove from Bookmark
                    </button>
                  ) : (
                    <button
                      onClick={() => addToBookmark(article)}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Add to Bookmark
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
