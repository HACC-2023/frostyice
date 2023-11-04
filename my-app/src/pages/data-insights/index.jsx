import { useState } from "react";
import CityMap from "@/components/visualizations/CityMapBox";
import IslandBarChart from "@/components/visualizations/IslandBarChart";
import PieChart from "@/components/visualizations/PieChart";
import ReportTimesSeries from "@/components/visualizations/ReportTimeSeries";
import OrganizationFunnel from "@/components/visualizations/OrganizationFunnel";
import ComponentsPieChart from "@/components/visualizations/ComponentsPieChart";
import DisposalBarChart from "@/components/visualizations/DisposalBarChart";
import SankeyChart from "@/components/visualizations/SankeyChart";

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabContent = [
    <div key="tab1">
      <div className="flex pt-6 flex-row justify-between p-8 mt-4 shadow">
        <div className="w-3/6">
          <h6 className="text-lg font-semibold text-gray-600 mb-2">
            Aggregated Reports By City
          </h6>
          <CityMap />
        </div>
        <div className="w-3/6 pl-16">
          <h6 className="text-lg font-semibold text-gray-600 mb-4">
            Reports By Island
          </h6>
          <h8 className="text-sm font-semibold text-gray-600 mb-2">
            Status of Reports
          </h8>
          <IslandBarChart />
          <br />
          <h8 className="text-sm font-semibold text-gray-600 mb-2">
            Percentage of Reports
          </h8>
          <PieChart />
        </div>
      </div>
      <div className="flex pt-6 flex-row justify-between p-8 mt-4 shadow">
        <div className="w-3/6">
          <h6 className="text-lg font-semibold text-gray-600 mb-2">
            Reports Solved by Organization Over Time
          </h6>
          <ReportTimesSeries />
        </div>
        <div className="w-3/6 pl-16">
          <h6 className="text-lg font-semibold text-gray-600 mb-2">
            Percetange of Reports Solved by Organization
          </h6>
          <OrganizationFunnel />
        </div>
      </div>
    </div>,
    <div key="tab2">
      {" "}
      <div className="flex pt-6 flex-row justify-between p-8 mt-4 shadow">
        <div className="w-4/6">
          <h6 className="text-lg font-semibold text-gray-600 mb-2">
            Components
          </h6>
          <ComponentsPieChart />
        </div>
        <div className="w-2/6 pl-10">
          <h6 className="text-lg font-semibold text-gray-600 mb-4">
            Disposal Method By Mass
          </h6>
          <DisposalBarChart />
        </div>
      </div>
      <div className="flex flex-row justify-between pt-6 p-8 mt-4 shadow">
        <div className="w-1/1">
          <h6 className="text-lg font-semibold text-gray-600 mb-4">
            Flow of Marine Debris: From Islands to Disposal
          </h6>
          <SankeyChart />
        </div>
      </div>
    </div>,
  ];

  const tabNames = ["Reports", "Sorting & Disposal"];

  return (
    <div className="justify-center items-center">
      <div className="mt-2 bg-white p-14">
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
