import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Locations from "../../../../dummy-data/locations.json";

// prevents SSR issues with certain mapbox components
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
