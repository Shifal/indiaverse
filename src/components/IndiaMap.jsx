import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaTopo from "../assets/india.topo.json";

const IndiaMap = ({ onSelectState }) => {
  console.log("✅ InfoPanel onSelectState:",onSelectState);

  return (
    <div className="w-full h-[600px] bg-white rounded-xl shadow-md p-4 flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 400,
          center: [110,-10],
        }}
        width={600}
        height={700}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={indiaTopo}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    console.log("Clicked state:", stateName);
                    onSelectState(stateName);
                  }}                  
                  style={{
                    default: {
                      fill: "#f3f4f6",
                      stroke: "#1f2937",
                      strokeWidth: 0.6,
                      outline: "none",
                      transition: "all 0.3s ease-in-out",
                    },
                    hover: {
                      fill: "#2563eb",
                      stroke: "#1f2937",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 4px rgba(37,99,235,0.5))",
                    },
                    pressed: {
                      fill: "#1e40af",
                      stroke: "#1f2937",
                      strokeWidth: 1.2,
                      outline: "none",
                    },
                  }}
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
