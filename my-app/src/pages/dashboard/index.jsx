import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DashboardTable from "@/components/DashboardTable";

const Dashboard = () => {
  return (
    <div className="justify-center items-center">
      <div className="mt-2 bg-white p-14">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Dashboard</h3>
        <hr />
        <br />
        <div className="flex flex-row pt-6 pl-8">
          <PlusCircleIcon className="h-5 w-5 text-gray-600" />
          <h6 className="text-gray-600 pl-1 font-semibold text-md">Multievent Shipment</h6>
        </div>
        <DashboardTable />
      </div>
    </div>
  );
};

export default Dashboard;
