
import CityMap from "@/components/visualizations/CityMap";
const DataInsights = () => {

  return (
    <div className="justify-center items-center">
      <div className="mt-10 bg-white p-14">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          Data Insights
        </h3>
        <hr />
        <CityMap />

      </div>
    </div>
  );
};

export default DataInsights;
