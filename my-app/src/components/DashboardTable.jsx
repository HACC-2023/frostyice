import { useState } from "react";
import PropTypes from "prop-types";

const DashboardTable = ({ events }) => {
  const [filter, setFilter] = useState({
    status: "",
    dateSort: "asc",
    island: "",
  });

  // Create pill color for status
  function getStatusColor(status) {
    const statusColors = {
      Reported: "bg-yellow-600",
      "Removal and Storage": "bg-blue-800",
      Sorting: "bg-orange-600",
      Disposal: "bg-purple-700",
      Complete: "bg-green-700",
    };

    return statusColors[status] || "bg-gray-500";
  }

  // Filter events based on filter state, date, island
  const filteredEvents = events
    .filter((event) => {
      if (filter.status && event.status !== filter.status) {
        return false;
      }

      if (filter.island && event.closestIsland !== filter.island) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filter.dateSort === "asc") {
        return new Date(a.reportedDate) - new Date(b.reportedDate);
      } else if (filter.dateSort === "desc") {
        return new Date(b.reportedDate) - new Date(a.reportedDate);
      } else {
        return 0;
      }
    });

  return (
    <div className="overflow-x-auto bg-white">
      <div className="flex justify-end space-x-8 mb-6 mt-6">
        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Status:</label>
          <select
            className="select bg-white text-gray-500"
            name="status"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="Reported">Reported</option>
            <option value="Removal and Storage">Removal and Storage</option>
            <option value="Sorting">Sorting</option>
            <option value="Disposal">Disposal</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Sort by Date:</label>
          <select
            className="select bg-white text-gray-500"
            name="dateSort"
            value={filter.dateSort}
            onChange={(e) => setFilter({ ...filter, dateSort: e.target.value })}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-600 pr-2">Island:</label>
          <select
            className="select bg-white text-gray-500"
            name="island"
            value={filter.island}
            onChange={(e) => setFilter({ ...filter, island: e.target.value })}
          >
            <option value="">All</option>
            <option value="Oahu">Oahu</option>
            <option value="Maui">Maui</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Kauai">Kauai</option>
            <option value="Molokai">Molokai</option>
            <option value="Lanai">Lanai</option>
            <option value="Niihau">Niihau</option>
            <option value="Kahoolawe">Kahoolawe</option>
          </select>
        </div>
      </div>

      <table className="table bg-white text-gray-600">
        <thead>
          <tr className="text-gray-600">
            <td className="w-56">Status</td>
            <td className="w-32">Date</td>
            <td>Debris Type</td>
            <td>Debris Env. Description</td>
            <td>Closest Island</td>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id}>
              <td className="py-1">
                <div
                  className={`rounded-full px-2.5 py-0.5 text-xxs text-white font-semibold ${getStatusColor(
                    event.status
                  )} inline-block whitespace-no-wrap mx-auto`}
                >
                  {event.status}
                </div>
              </td>
              <td>{event.reportedDate.split("T")[0]}</td>
              <td>{event.publicType}</td>
              <td>{event.publicDebrisEnvDesc}</td>
              <td>{event.closestIsland}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DashboardTable.propTypes = {
  events: PropTypes.array.isRequired,
};

export default DashboardTable;
