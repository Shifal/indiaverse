import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import IndiaMap from "../components/IndiaMap";
import InfoPanel from "../components/InfoPanel";
import mockData from "../data/stateTrends";
import ThemeToggle from "../components/ThemeToggle";
import OfflineNotice from "../components/OfflineNotice";

const TABS = ["Trends", "Jobs", "Startups", "Videos"];

const HomePage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [activeTab, setActiveTab] = useState("Trends");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const [resetMap, setResetMap] = useState(false);
  const [resetMapTrigger, setResetMapTrigger] = useState(false);

  const tabData = selectedState && mockData[selectedState]?.[activeTab];

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSuggestions([]);
      return;
    }

    const matchedStates = Object.keys(mockData).filter((state) =>
      state.toLowerCase().includes(term)
    );
    setSuggestions(matchedStates);
    setActiveSuggestionIndex(-1);
  }, [searchTerm]);

  const handleSelectSuggestion = (state) => {
    setSelectedState(state);
    setSearchTerm(state);
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleReset = () => {
    setSelectedState(null);
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    setResetMap(true);
    setResetMapTrigger(Date.now());
  };

  useEffect(() => {
    if (resetMap) {
      setResetMap(false);
    }
  }, [resetMap]);


  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      return;
    }

    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
        e.preventDefault();
      }
    }
  };

  const getHighlightedText = (text, highlight) => {
    const index = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + highlight.length);
    const after = text.slice(index + highlight.length);

    return (
      <>
        {before}
        <strong className="text-blue-500">{match}</strong>
        {after}
      </>
    );
  };

  return (
    <>
      {isOffline && <OfflineNotice />}
      <Layout>
        <div className="max-w-8xl mx-auto px-4 py-8">
          <ThemeToggle />

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800 dark:text-blue-300">
            🇮🇳 IndiaVerse{" "}
            <span className="text-gray-700 dark:text-gray-300">
              – Real-Time Local Trends
            </span>
          </h1>

          <div className="flex flex-col md:flex-row gap-1">
            {/* Left Side: Map + Floating Search */}
            <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow text-gray-900 dark:text-white relative overflow-hidden">
              {/* Floating Box */}
              <div className="absolute top-4 left-4 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-2 flex items-center gap-2 w-[280px]">
                {/* Search */}
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search state"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  {/* Suggestions Dropdown */}
                  <div
                    className={`absolute left-0 top-10 z-30 w-full transform origin-top transition-all duration-200 ${showSuggestions ? "opacity-100 scale-y-100" : "opacity-0 scale-y-75 pointer-events-none"
                      }`}
                  >
                    <ul className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                      {suggestions.length > 0 ? (
                        suggestions.map((s, idx) => (
                          <li
                            key={idx}
                            className={`px-3 py-1.5 text-sm cursor-pointer transition duration-200 delay-[${idx *
                              30}ms] ${idx === activeSuggestionIndex
                                ? "bg-blue-100 dark:bg-gray-700"
                                : "hover:bg-blue-50 dark:hover:bg-gray-700"
                              }`}
                            onMouseDown={() => handleSelectSuggestion(s)}
                          >
                            {getHighlightedText(s, searchTerm)}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 italic">
                          No results found.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={handleReset}
                  className="px-2 py-1 text-xs rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Reset
                </button>
              </div>

              {/* Map */}
              <IndiaMap
                onSelectState={(state) => {
                  setSelectedState(state);
                  setSearchTerm(state);
                }}
                selectedState={selectedState}
                resetMapTrigger={resetMapTrigger}
              />
            </div>

            {/* Info Panel */}
            <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow text-gray-900 dark:text-white">
              <InfoPanel
                selectedState={selectedState}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabData={tabData}
                tabs={TABS}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
