import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await axios.get("/api/user/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setBookmarks(res.data.bookmarks);
        } else {
          setError("Error fetching bookmarks");
        }
      } catch (err) {
        setError(`Error fetching bookmarks: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const removeFromBookmark = async (article) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await axios.delete("/api/user/bookmark", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { article },
      });

      if (res.status === 200) {
        setBookmarks(
          bookmarks.filter((bookmark) => bookmark.url !== article.url)
        );
        toast.success("Article removed from bookmarks");
      } else {
        setError("Error removing bookmark");
      }
    } catch (err) {
      setError(`Error removing bookmark: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bookmarked Articles
      </h1>
      {bookmarks.length === 0 ? (
        <p className="text-center">No bookmarked articles available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {bookmark.urlToImage && (
                <img
                  src={bookmark.urlToImage}
                  alt={bookmark.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{bookmark.title}</h2>
                <p className="text-gray-700 mb-4">{bookmark.description}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                  <button
                    onClick={() => removeFromBookmark(bookmark)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Remove from Bookmark
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
