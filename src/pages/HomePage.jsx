import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import IndiaMap from "../components/IndiaMap";
import InfoPanel from "../components/InfoPanel";
import mockData from "../data/stateTrends";
import ThemeToggle from "../components/ThemeToggle";
import OfflineNotice from "../components/OfflineNotice";
import confetti from "canvas-confetti";

const TABS = ["Trends", "Jobs", "Startups", "Videos"];
const OPEN_CAGE_API_KEY = "057fa619751a4265abfd3590263080fb";

const HomePage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [activeTab, setActiveTab] = useState("Trends");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [resetMap, setResetMap] = useState(false);
  const [resetMapTrigger, setResetMapTrigger] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false); // ✅ Location Loader

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const allStates = Object.keys(mockData);
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
    if (!term) setSuggestions(allStates);
    else {
      const matched = allStates.filter((state) =>
        state.toLowerCase().includes(term)
      );
      setSuggestions(matched);
    }
    setActiveSuggestionIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.toLowerCase().includes("bharat")) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        emojis: ["🇮🇳", "🎉", "✨"],
      });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (resetMap) setResetMap(false);
  }, [resetMap]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
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
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      e.preventDefault();
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

  // ✅ Use My Location with Loader
  const handleUseMyLocation = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${OPEN_CAGE_API_KEY}`
          );
          const data = await response.json();
          const state = data?.results?.[0]?.components?.state;
          if (state && allStates.includes(state)) {
            handleSelectSuggestion(state);
          } else {
            alert("Your location does not map to an Indian state in this app.");
          }
        } catch (err) {
          console.error("Error in geolocation:", err);
          alert("Something went wrong while detecting your location.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (err) => {
        alert("Failed to get your location.");
        setDetectingLocation(false);
      }
    );
  };

  return (
    <>
      {isOffline && <OfflineNotice />}
      <Layout>
        <div className="max-w-8xl mx-auto px-4 py-8">
          <ThemeToggle />
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-10 h-10 animate-spin-slow">
              <svg viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="tricolor" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF9933" />
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="#138808" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="55" stroke="url(#tricolor)" strokeWidth="10" />
                <circle cx="60" cy="60" r="2" fill="#000080" />
                {[...Array(24)].map((_, i) => {
                  const angle = (360 / 24) * i;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 60 + 2 * Math.cos(rad);
                  const y1 = 60 + 2 * Math.sin(rad);
                  const x2 = 60 + 50 * Math.cos(rad);
                  const y2 = 60 + 50 * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#000080"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300">
              IndiaVerse <span className="text-gray-700 dark:text-gray-300">– Real-Time Local Trends</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-1">
            {/* Map + Search */}
            <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow text-gray-900 dark:text-white relative overflow-hidden">

              {/* Search Box */}
              <div ref={dropdownRef} className="absolute top-4 left-4 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-2 flex items-center gap-2 w-[280px]">
                <div className="relative w-full">
                  <div className="flex items-center relative">
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
                      onKeyDown={handleKeyDown}
                      className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                    />
                    <button
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                      title="Show all states"
                      onClick={() => {
                        setShowSuggestions(true);
                        setSuggestions(allStates);
                      }}
                    >
                      ▼
                    </button>
                  </div>

                  {/* Dropdown */}
                  <div className={`absolute left-0 top-10 z-30 w-full transition-all origin-top transform duration-200 ${showSuggestions ? "opacity-100 scale-y-100" : "opacity-0 scale-y-75 pointer-events-none"}`}>
                    <ul className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                      {suggestions.length > 0 ? (
                        suggestions.map((s, idx) => (
                          <li
                            key={idx}
                            className={`px-3 py-1.5 text-sm cursor-pointer transition duration-200 ${idx === activeSuggestionIndex
                              ? "bg-blue-100 dark:bg-gray-700"
                              : "hover:bg-blue-50 dark:hover:bg-gray-700"
                              }`}
                            onMouseDown={() => handleSelectSuggestion(s)}
                          >
                            {getHighlightedText(s, searchTerm)}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 italic">No results found.</li>
                      )}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-2 py-1 text-xs rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Reset
                </button>
              </div>

              {/* 📍 Use My Location Button */}
              <button
                onClick={handleUseMyLocation}
                className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-full text-sm bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
                title="Detect your state using GPS"
              >
                📍
              </button>

              {/* ✅ Loader Under Button */}
              {detectingLocation && (
                <div className="absolute bottom-16 right-4 z-30 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs px-3 py-1.5 rounded shadow-md flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z" />
                  </svg>
                  Fetching your location...
                </div>
              )}

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
