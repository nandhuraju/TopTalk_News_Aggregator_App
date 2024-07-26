import React, { useEffect, useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            country: "in",
            language: "en",
            pageSize: 4,
            apiKey: import.meta.env.VITE_NEWS_API_KEY, // Use import.meta.env for Vite
          },
        });

        if (res.status === 200) {
          setNews(res.data.articles);
        } else {
          setError("Error fetching news");
        }
      } catch (err) {
        setError(`Error fetching news: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Latest News</h1>
      <div className="flex overflow-x-auto space-x-4">
        {news.map((article) => (
          <div
            key={article.url}
            className="flex-none w-80 border rounded-lg overflow-hidden shadow-md"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
