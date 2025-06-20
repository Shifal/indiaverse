import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaTopo from "../assets/india.topo.json";

const IndiaMap = ({ onSelectState }) => {
  return (
    <div className="w-full h-[800px] bg-white rounded-xl shadow-md p-2 flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [85, 21] }}
        width={600}
        height={800}
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
                  onClick={() => onSelectState(stateName)}
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
