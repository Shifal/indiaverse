import { useState, useEffect } from "react";
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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  return (
    <>
      {isOffline && <OfflineNotice />}
      <Layout>
        <div className="max-w-8xl mx-auto px-4 py-8">
          <ThemeToggle />
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
            🇮🇳 IndiaVerse <span className="text-gray-700">– Real-Time Local Trends</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-1">
            <div className="w-full md:w-1/2 bg-blue-50 p-4 rounded-lg shadow">
              <IndiaMap onSelectState={setSelectedState} />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow text-gray-900">
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
