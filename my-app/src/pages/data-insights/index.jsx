import { useState, useEffect } from "react";
import IslandBarChart from "@/components/visualizations/IslandBarChart";
import IslandPieChart from "@/components/visualizations/IslandPieChart";
import DoughnutChart from "@/components/visualizations/DoughnutChart";
// import SankeyChart from "@/components/visualizations/SankeyChart";
import dynamic from "next/dynamic";
import Container from "@/components/Container";

const LocationAggregatorMap = dynamic(
  () => import("@/components/map/LocationAggregatorMap"),
  { ssr: false }
);

const SankeyChart = dynamic(
  () => import("@/components/visualizations/SankeyChart"),
  {
    ssr: false,
  }
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

  const tabContent = [
    <div key="tab1" className="bg-base-200 rounded-xl p-8 mt-3">
      <div className="flex flex-row justify-between mt-2 rounded-xl bg-base-200">
        <div className="w-full">
          <h6 className="text-secondary text-lg font-bold mb-4">
            Current Events Location
          </h6>
          {/* <CityMap /> */}
          <LocationAggregatorMap data={coordinates} />
        </div>
      </div>
      <div className="divider my-4" />
      <div>
        <h6 className="block text-secondary text-lg font-bold mb-4">
          Events By Islands
        </h6>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
          <div className="flex flex-col justify-between h-80 bg-neutral p-4 rounded-xl w-full lg:w-1/2 items-center">
            <h6 className="block text-secondary text-xs font-bold">
              Events Status
            </h6>
            <IslandBarChart data={events} />
          </div>
          <div className="flex flex-col justify-between h-80 bg-neutral p-4 rounded-xl w-full lg:w-1/2 items-center">
            <h6 className="block text-secondary text-xs font-bold">
              Events Percentage
            </h6>
            <IslandPieChart data={events} />
          </div>
        </div>
      </div>
    </div>,

    <div key="tab2" className="bg-base-200 rounded-xl p-8 mt-3">
      <div className="p-8 bg-neutral rounded-xl">
        <div className="w-full flex flex-col items-center justify-center">
          <h6 className="text-secondary text-lg font-bold mb-4">
            Flow of Marine Debris: From Islands to Disposal
          </h6>
          <SankeyChart events={events} sortedMaterials={sortedMaterials} />
        </div>
      </div>
      <div className="flex p-8 bg-neutral rounded-xl mt-4">
        <div className="w-full mb-10">
          <h6 className="block text-secondary text-xl font-bold mb-4">
            Component Breakdown
          </h6>
          <DoughnutChart events={events} sortedMaterials={sortedMaterials} />
        </div>
      </div>
    </div>,
  ];

  const tabNames = ["Reports", "Sorting & Disposal"];

  return (
    <Container>
      <div className="mt-2 p-8">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          Data Insights
        </h3>
        <hr />
        <br />
        <div className="tabs tabs-boxed">
          {tabContent.map((content, index) => (
            <a
              key={index}
              className={`tab text-gray-500 ${
                activeTab === index ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tabNames[index]}
            </a>
          ))}
        </div>
        <div className="tab-content">{tabContent[activeTab]}</div>
      </div>
    </Container>
  );
};

export default DataInsights;
