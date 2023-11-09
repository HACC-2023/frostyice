// components/Map.jsx
import React, { useCallback, useState } from "react";
import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import { FlyToInterpolator } from "deck.gl";

// import map config
import {
  lightingEffect,
  material,
  INITIAL_VIEW_STATE,
  colorRange,
} from "@/lib/mapconfig";
import { ISLANDS_CENTER_COORDINATES } from "@/constants/constants";

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
      elevationRange: [0, 400],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: (d) => d.COORDINATES,
      pickable: true,
      radius: 1000,
      upperPercentile,
      material,

      transitions: {
        elevationScale: 400,
      },
    }),
  ];
  const [initialViewState, setInitialViewState] = useState({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  const onSelectIsland = useCallback(({ longitude, latitude }) => {
    setInitialViewState({
      longitude: longitude,
      latitude: latitude,
      zoom: 9,
      pitch: 0,
      bearing: 0,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, []);
  // flies to island when selected
  // const onSelectIsland = useCallback(({ longitude, latitude }) => {
  //   console.log("onSelectIsland", longitude, latitude);
  //   console.log(mapRef.current);
  //   mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  // }, []);

  return (
    <div>
      <div className="h-[400px] w-full relative">
        <DeckGL
          style={{ width: "100%", height: "100%" }}
          layers={layers}
          effects={[lightingEffect]}
          initialViewState={initialViewState}
          controller={true}
        >
          <Map
            reuseMaps
            style={{ width: "100%", height: "100%" }}
            controller={true}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/dark-v10"
          />
        </DeckGL>
      </div>
      <select
        className="select select-bordered"
        onChange={(e) => {
          const coordinates = e.target.value.split(",").map((c) => Number(c));
          // return onSelectIsland({
          //   longitude: coordinates[1],
          //   latitude: coordinates[0],
          // });
          onSelectIsland({
            longitude: coordinates[1],
            latitude: coordinates[0]
          })
        }}
      >
        <option disabled selected>
          Select an Island
        </option>
        {Object.values(ISLANDS_CENTER_COORDINATES).map((island) => (
          <option key={island.name} value={island.coordinates}>
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
