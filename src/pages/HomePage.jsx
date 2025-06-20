import { useState } from "react";
import Layout from "../components/Layout";
import IndiaMap from "../components/IndiaMap";
import InfoPanel from "../components/InfoPanel";
import mockData from "../data/stateTrends";

const TABS = ["Trends", "Jobs", "Startups", "Videos"];

const HomePage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [activeTab, setActiveTab] = useState("Trends");
  const tabData = selectedState && mockData[selectedState]?.[activeTab];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          🇮🇳 IndiaVerse <span className="text-gray-700">– Real-Time Local Trends</span>
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-green-300">
            <IndiaMap onSelectState={setSelectedState} />
          </div>
          <div className="w-full md:w-1/2 bg-red-300">
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
  );
};

export default HomePage;
