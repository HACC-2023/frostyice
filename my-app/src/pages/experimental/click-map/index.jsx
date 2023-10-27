import Map, { Marker, NavigationControl } from "react-map-gl";
import Pin from "./components/Pin";
import { useState, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { INITIAL_VIEW_STATE } from "@/lib/mapconfig";

const ClickableMap = () => {
  const [marker, setMarker] = useState({
    longitude: INITIAL_VIEW_STATE.longitude,
    latitude: INITIAL_VIEW_STATE.latitude,
    // zoom: 5.6,
  });
  const [locations, setLocations] = useState([]);
  // When done dragging, update marker position
  const onMarkerDragEnd = useCallback((event) => {
    setMarker({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
    setLocations((current) => [
      ...current,
      { longitude: event.lngLat.lng, latitude: event.lngLat.lat },
    ]);
  }, []);
  // When clicked, update marker position
  const onMapClick = useCallback((event) => {
    setMarker({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
    setLocations((current) => [
      ...current,
      { longitude: event.lngLat.lng, latitude: event.lngLat.lat },
    ]);
  }, []);

  // console.log(marker.longitude, marker.latitude)
  return (
    <div className="min-h-screen">
      <div className="w-fit h-fit">
        {console.log("locations:", locations)}
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          reuseMaps
          controller={true}
          style={{ width: "600px", height: "400px" }}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onClick={onMapClick}
        >
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            draggable
            onDragEnd={onMarkerDragEnd}
          >
            <Pin size={20} />
          </Marker>

          <NavigationControl />
        </Map>
      </div>
      <a
        className="underline text-blue-600"
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(locations)
        )}`}
        download="locations.json"
      >
        {`Download Locations JSON`}
      </a>
    </div>
  );
};

export default ClickableMap;
