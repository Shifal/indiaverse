import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaTopo from "../assets/india.topo.json";
import stateInfo from "../data/stateInfo";

const IndiaMap = ({ onSelectState, selectedState }) => {
  const [tooltip, setTooltip] = useState({
    visible: true,
    content: {
      name: "India",
      population: "1.4B",
      capital: "New Delhi",
    },
  });


  return (
    <div className="relative w-full h-[800px] bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-md p-2 flex items-center justify-center">
      {/* Tooltip */}
      {tooltip.visible && (
        <div className="absolute top-4 right-4 z-50 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded px-3 py-2 shadow-lg">
          <strong>{tooltip.content?.name}</strong>
          <br />
          Population: {tooltip.content?.population}
          <br />
          Capital: {tooltip.content?.capital}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1300, center: [80, 22] }}
        width={800}
        height={800}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={indiaTopo}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const info = stateInfo[stateName] || {};
              const isActive = selectedState === stateName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#999"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      fill: isActive ? "#42A5F5" : "#E0E0E0",
                      outline: "none",
                    },
                    hover: {
                      fill: "#FFB300",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#F57C00",
                      outline: "none",
                    },
                  }}
                  onMouseEnter={() => {
                    setTooltip({
                      visible: true,
                      content: {
                        name: stateName,
                        population: info.population || "N/A",
                        capital: info.capital || "N/A",
                      },
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltip({
                      visible: true,
                      content: {
                        name: "India",
                        population: "1.4B",
                        capital: "New Delhi",
                      },
                    });
                  }}
                  onClick={() => onSelectState(stateName)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
