// import Map from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useState, useEffect } from "react";

// const MapboxPage = () => {
//   const [details, setDetails] = useState([]);
//   const [coordinates, setCoordinates] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const response = await fetch(
//         "https://api-shipx-pl.easypack24.net/v1/points?per_page=28000"
//       );

//       const data = await response.json();
//       setDetails(data.items);

//       // Create an array of geo coordinates pairs
//       const coords = data.items.map((item) => [
//         item.location.longitude,
//         item.location.latitude,
//       ]);
//       setCoordinates(coords);
//     };
//     getData();
//   }, []);
//   console.log(coordinates);
//   return (
//     <Map
//       mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
//       initialViewState={{
//         longitude: -122.4,
//         latitude: 37.8,
//         zoom: 14,
//       }}
//       style={{ width: 600, height: 400 }}
//       mapStyle="mapbox://styles/mapbox/streets-v9"
//     />
//   );
// };

// export default MapboxPage;

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Locations from "../../../../dummy-data/locations.json";

const LocationAggregatorMap = dynamic(
  () => import("@/components/map/LocationAggregatorMap"),
  { ssr: false }
);

const HomePage = () => {
  const [details, setDetails] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    // const getData = async () => {
    //   const response = await fetch(
    //     "https://api-shipx-pl.easypack24.net/v1/points?per_page=28000"
    //   );

    //   const data = await response.json();
    //   setDetails(data.items);

    // Create an array of geo coordinates pairs
    const coords = Locations.map((item) => [item.longitude, item.latitude]);
    setCoordinates(coords);
    // };
    // getData();
  }, []);
  // console.log(coordinates);
  console.log("location", Locations);

  return (
    <div className="relative min-h-screen">
      <LocationAggregatorMap data={coordinates} />
    </div>
  );
};

export default HomePage;
