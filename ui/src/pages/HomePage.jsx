import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);

  // Fetch news and bookmarks
  const fetchNews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const [newsRes, bookmarksRes] = await Promise.all([
        axios.get("/api/user/news", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/user/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (newsRes.status === 200 && bookmarksRes.status === 200) {
        setArticles(newsRes.data.articles);
        setBookmarkedArticles(bookmarksRes.data.bookmarks);
      } else {
        setError("Error fetching news");
      }
    } catch (err) {
      setError(`Error fetching news: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
    }
    fetchNews();
  }, []);

  // Add article to bookmarks
  const addToBookmark = async (article) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      await axios.post(
        "/api/user/bookmark",
        { article },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookmarkedArticles((prevBookmarks) => [...prevBookmarks, article]);
      toast.success("Article bookmarked successfully");
    } catch (err) {
      setError(`Error bookmarking article: ${err.message}`);
    }
  };

  // Remove article from bookmarks
  const removeFromBookmark = async (article) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      await axios.delete("/api/user/bookmark", {
        headers: { Authorization: `Bearer ${token}` },
        data: { article },
      });

      setBookmarkedArticles((prevBookmarks) =>
        prevBookmarks.filter((a) => a.url !== article.url)
      );
      toast.success("Article removed from bookmarks");
    } catch (err) {
      setError(`Error removing bookmark: ${err.message}`);
    }
  };

  // Check if an article is bookmarked
  const isBookmarked = (article) =>
    bookmarkedArticles.some((a) => a.url === article.url);

  if (loading) return <div className="text-center mt-20">News Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Top News </h1>
      {articles.length === 0 ? (
        <p className="text-center">No news articles available</p>
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
                  {userType === "admin" && article.custom && (
                    <Link
                      to={`/edit-news/custom/${article._id}`}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      Edit News
                    </Link>
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

export default Homepage;
