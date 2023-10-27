// components/Map.jsx
import React from "react";
import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";

// import map config
import {
  lightingEffect,
  material,
  INITIAL_VIEW_STATE,
  colorRange,
} from "../../lib/mapconfig";

const LocationAggregatorMap = ({
  upperPercentile = 100,
  coverage = 1,
  data,
}) => {
  const layers = [
    new HexagonLayer({
      id: "heatmap",
      colorRange,
      coverage,
      data,
      elevationRange: [0, 3000],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: (d) => d,
      pickable: true,
      radius: 1000,
      upperPercentile,
      material,

      transitions: {
        elevationScale: 3000,
      },
    }),
  ];

  return (
    <div>
      <DeckGL
        style={{ width: "600px", height: "400px" }}
        layers={layers}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <Map
          reuseMaps
          controller={true}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        ></Map>
      </DeckGL>
    </div>
  );
};

export default LocationAggregatorMap;
