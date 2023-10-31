import Map, { Marker } from "react-map-gl";
import Pin from "./components/Pin";
import { useState, useCallback, useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { INITIAL_VIEW_STATE } from "@/lib/mapconfig";
import GeocoderControl from "./components/GeocoderControl";

const ClickableMap = () => {
  const [marker, setMarker] = useState({
    longitude: INITIAL_VIEW_STATE.longitude,
    latitude: INITIAL_VIEW_STATE.latitude,
    // zoom: 5.6,
  });
  const [locations, setLocations] = useState([]);

  const geoControlRef = useRef();
  console.log("geoControlRef", geoControlRef.current);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    
    function success(pos) {
      const crd = pos.coords;
    
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setMarker({ longitude: crd.longitude, latitude: crd.latitude, zoom: 1 });
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);    
  }, [])

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
      <div className="h-[600px] w-[600px] pt-[60px]">
        {console.log("locations:", locations)}
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          reuseMaps
          controller={true}
          style={{ width: "100%", height: "100%" }}
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
            zoom={marker.zoom}
          >
            <Pin size={20} />
          </Marker>
          <GeocoderControl
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            setMarker={setMarker}
            position="top-left"
          />
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
