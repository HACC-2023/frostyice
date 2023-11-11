import { useState, useEffect } from "react";
import IslandBarChart from "@/components/visualizations/IslandBarChart";
import IslandPieChart from "@/components/visualizations/IslandPieChart";
import DoughnutChart from "@/components/visualizations/DoughnutChart";
import SankeyChart from "@/components/visualizations/SankeyChart";
import dynamic from "next/dynamic";

const LocationAggregatorMap = dynamic(
  () => import("@/components/map/LocationAggregatorMap"),
  { ssr: false }
);

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const [events, setEvents] = useState([]);
  const [sortedMaterials, setSortedMaterials] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/mongo/event/all");
      const data = await res.json();
      const coords = data.map((item) => {
        return { COORDINATES: [item.mapLong, item.mapLat] };
      });
      setCoordinates(coords);
      setEvents(data);
    };
    getData().then((r) => console.log("Fetched locations"));
  }, []);

  useEffect(() => {
    const getSortedData = async () => {
      const res = await fetch(" /api/mongo/sorted-material/sorted-materials");
      const data = await res.json();

      if (data) {
        setSortedMaterials(data);
      } else {
        console.log("Failed to load sorted materials data.");
      }
    };
    getSortedData().then((r) => console.log("Fetched sorted materials data."));
  }, []);

  console.log("coordinates", coordinates);

  const tabContent = [
    <div key="tab1">
      <div className="flex flex-row justify-between p-8 mt-2 shadow">
        <div className="w-full">
          <h6 className="block uppercase text-secondary text-sm font-bold mb-4">
            Current Events Location
          </h6>
          {/* <CityMap /> */}
          <LocationAggregatorMap data={coordinates} />
        </div>
      </div>
      <div className="flex pt-6 flex-row justify-between p-8 mt-4 shadow">
        <div className="w-2/4">
          <h6 className="block uppercase text-secondary text-sm font-bold mb-4">
            Events By Islands
          </h6>
          <h6 className="block uppercase text-secondary text-xs font-bold mb-10">
            Events Status
          </h6>
          <IslandBarChart data={events} />
        </div>
        <div className="w-2/4">
          <h6 className="block uppercase text-secondary text-xs font-bold mb-8 mt-8">
            Events Percentage
          </h6>
          <IslandPieChart data={events} />
        </div>
      </div>
    </div>,
    <div key="tab2">
      {" "}
      <div className="flex pt-6 flex-row justify-between p-8 mt-4 shadow">
        <div className="w-1/1">
          <h6 className="text-lg font-semibold text-gray-600 mb-2">
            Flow of Marine Debris: From Islands to Disposal
          </h6>
          <SankeyChart />
        </div>
      </div>
      <div className="flex flex-row justify-between pt-6 p-8 mt-6 shadow">
        <div className="w-full mb-10">
          <h6 className="block uppercase text-secondary text-sm font-bold mb-4">
            Components
          </h6>
          <DoughnutChart events={events} sortedMaterials={sortedMaterials} />
        </div>
      </div>
    </div>,
  ];

  const tabNames = ["Reports", "Sorting & Disposal"];

  return (
    <div className="justify-center items-center">
      <div className="mt-2 p-8">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          Data Insights
        </h3>
        <hr />
        <br />
        <div className="tabs">
          {tabContent.map((content, index) => (
            <a
              key={index}
              className={`tab tab-bordered text-gray-600 ${
                activeTab === index ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tabNames[index]}
            </a>
          ))}
        </div>
        <div className="tab-content p-4">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default DataInsights;
