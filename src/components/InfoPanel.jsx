import { useEffect, useState } from "react";

const InfoPanel = ({ selectedState, activeTab, setActiveTab, tabData, tabs }) => {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    if (activeTab === "Trends") {
      setLoadingNews(true);
      setNewsError(null);
      setNews([]);

      const fetchNews = async () => {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=100&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
          );
          const data = await response.json();
          if (data.status === "ok") {
            if (selectedState) {
              const filteredArticles = data.articles.filter(
                (article) =>
                  article.title?.toLowerCase().includes(selectedState.toLowerCase()) ||
                  article.description?.toLowerCase().includes(selectedState.toLowerCase())
              );

              setNews(filteredArticles.length > 0 ? filteredArticles : data.articles.slice(0, 5));
            } else {
              setNews(data.articles.slice(0, 10)); // India-wide news
            }
          } else {
            setNewsError("Unable to fetch news.");
          }
        } catch (err) {
          setNewsError("Failed to fetch news.");
        } finally {
          setLoadingNews(false);
        }
      };

      fetchNews();
    }
  }, [activeTab, selectedState]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-xl p-4 h-full min-h-[400px] flex flex-col text-justify">
      <h2 className="text-xl font-semibold mb-4">
        {selectedState
          ? `📍 ${selectedState} – ${activeTab}`
          : `🌐 India – ${activeTab}`}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-grow px-1">
        {activeTab === "Trends" ? (
          loadingNews ? (
            <p className="text-blue-500">Loading news...</p>
          ) : newsError ? (
            <p className="text-red-500">{newsError}</p>
          ) : news.length > 0 ? (
            <ul className="space-y-3">
              {news.map((article, idx) => (
                <li key={idx}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-400 hover:underline font-medium"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {article.source.name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No recent news {selectedState ? `for ${selectedState}` : "for India"}.
            </p>
          )
        ) : selectedState ? (
          tabData?.length ? (
            <ul className="list-disc pl-5 space-y-2 text-blue-700 dark:text-blue-400">
              {tabData.map((item, idx) => (
                <li key={idx} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No {activeTab} found for {selectedState}.
            </p>
          )
        ) : (
          <p className="text-gray-400 dark:text-gray-500 italic text-center mt-10">
            Select a state from the map to explore {activeTab}.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
