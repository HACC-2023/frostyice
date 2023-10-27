import Map, { Marker, NavigationControl } from "react-map-gl";
import ControlPanel from "./components/ControlPanel";
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
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);


  return (
    <div className="min-h-screen">
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        reuseMaps
        controller={true}
        style={{ width: "600px", height: "400px" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onClick={(e) => {
          setMarker({ longitude: e.lngLat.lng, latitude: e.lngLat.lat });
        }}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
    </div>
  );
};

export default ClickableMap;
