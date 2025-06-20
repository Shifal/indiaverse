const InfoPanel = ({ selectedState, activeTab, setActiveTab, tabData, tabs }) => {

    return (
        <div className="bg-white shadow-xl rounded-xl p-4 h-full min-h-[400px] flex flex-col text-justify">
        <h2 className="text-xl font-semibold mb-4">
          {selectedState ? `📍 ${selectedState} – ${activeTab}` : "📍 Select a State"}
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
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
  
        {/* Tab Content */}
        <div className="overflow-y-auto flex-grow px-1">
          {selectedState ? (
            tabData?.length ? (
              <ul className="list-disc pl-5 space-y-2 text-blue-700">
                {tabData.map((item, idx) => (
                  <li key={idx} className="hover:underline cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                No {activeTab} found for {selectedState}.
              </p>
            )
          ) : (
            <p className="text-gray-400 italic text-center mt-10">
              Select a state from the map to explore {activeTab}.
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default InfoPanel;
  