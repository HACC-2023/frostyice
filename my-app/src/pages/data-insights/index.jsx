import CityMap from "@/components/visualizations/CityMapBox";
import ReportTimesSeries from "@/components/visualizations/ReportTimeSeries";
import IslandBarChart from "@/components/visualizations/IslandBarChart";
import { useState } from "react";

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabContent = [
    <div key="tab1">
      <h5 className="text-xl font-semibold text-gray-600 mb-2">Reports By City</h5>
      <CityMap />
      <IslandBarChart />
    </div>,
    <div key="tab2">
      <ReportTimesSeries />
    </div>,
    "Content for Tab 3 goes here.",
  ];

  const tabNames = ["Reported", "Removal", "Sorting & Disposal"];

  return (
    <div className="justify-center items-center">
      <div className="mt-10 bg-white p-14">
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
