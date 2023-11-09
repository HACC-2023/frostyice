// components/Map.jsx
import React, { useCallback, useState } from "react";
import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
// import { HexagonLayer } from "deck.gl";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import { FlyToInterpolator } from "deck.gl";

// import map config
import { lightingEffect, material } from "@/lib/mapconfig";
import { ISLANDS_CENTER_COORDINATES } from "@/constants/constants";

const LocationAggregatorMap = ({
  upperPercentile = 100,
  coverage = 1,
  data,
}) => {
  const layers = [
    new HexagonLayer({
      id: "heatmap",
      // colorRange,
      coverage,
      data,
      elevationRange: [0, 500],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: (d) => d.COORDINATES,
      pickable: true,
      radius: 1000,
      upperPercentile,
      material,

      transitions: {
        elevationScale: 500,
      },
    }),
    // new HeatmapLayer({
    //   data,
    //   id: 'heatmp-layer',
    //   pickable: false,
    //   getPosition: d => d.COORDINATES,
    //   radiusPixels: 10,
    //   intensity: 1,
    //   threshold: 0.03
    // })
  ];
  const [initialViewState, setInitialViewState] = useState({
    longitude: -157,
    latitude: 21,
    zoom: 5.6,
    minZoom: 5.6,
    bearing: 0,
    pitch: 40.5,
  });

  const onSelectIsland = useCallback(({ longitude, latitude, zoom }) => {
    setInitialViewState({
      longitude: longitude,
      latitude: latitude,
      zoom: zoom,
      minZoom: 5.6,
      pitch: 40.5,
      bearing: 0,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, []);

  function getTooltip({ object }) {
    if (!object) {
      return null;
    }
    const lat = object.position[1];
    const lng = object.position[0];
    const count = object.points.length;

    return `\
      latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
      longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
      ${count} Report/ss`;
  }

  return (
    <div>
      <div className="h-[400px] w-full relative">
        <DeckGL
          style={{ width: "100%", height: "100%" }}
          layers={layers}
          effects={[lightingEffect]}
          initialViewState={initialViewState}
          controller={true}
          getTooltip={getTooltip}
        >
          <Map
            reuseMaps
            style={{ width: "100%", height: "100%" }}
            controller={true}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/giorgio808/cloro3xca005y01pq4dkc11ib"
          />
        </DeckGL>
      </div>
      <select
        className="select select-bordered my-3"
        onChange={(e) => {
          const mapInfo = JSON.parse(e.target.value);
          onSelectIsland({
            longitude: mapInfo.long,
            latitude: mapInfo.lat,
            zoom: mapInfo.zoom,
          });
        }}
      >
        <option disabled>Select an Island</option>
        {Object.values(ISLANDS_CENTER_COORDINATES).map((island) => (
          <option key={island.name} value={JSON.stringify(island.mapInfo)}>
            {island.name}
          </option>
        ))}
      </select>
    </div>
  );
};

LocationAggregatorMap.propTypes = {
  upperPercentile: PropTypes.number,
  coverage: PropTypes.number,
  data: PropTypes.array,
};

export default LocationAggregatorMap;
