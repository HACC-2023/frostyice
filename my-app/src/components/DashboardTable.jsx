const dashboardDummyData = [
  {
    _id: 1,
    status: "Sorting",
    debrisType: "Net",
    debrisDescription: "A big net stuck on a boat",
    coordinates: "1234, 5678",
    location: "Kuakini Street, Honolulu",
  },
  {
    _id: 2,
    status: "Removing",
    debrisType: "Line",
    debrisDescription: "A fishing line in the street",
    coordinates: "1234, 5678",
    location: "Kuakini Street, Honolulu",
  },
  {
    _id: 3,
    status: "Processing",
    debrisType: "dFAD",
    debrisDescription: "A dFAD stuck on the rocks",
    coordinates: "1234, 5678",
    location: "Kuakini Street, Honolulu",
  },
];

const DashboardTable = () => {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="table table-pin-rows table-pin-cols bg-white text-gray-500">
        <thead>
          <tr className="text-gray-200">
            <th>_ID</th>
            <td>Status</td>
            <td>Debris Type</td>
            <td>Debris Description</td>
            <td>Coordinates</td>
            <td>Location</td>
          </tr>
        </thead>
        <tbody>
          {dashboardDummyData.map((data) => (
            <tr key={data._id}>
              <th className="text-gray-200">{data._id}</th>
              <td>{data.status}</td>
              <td>{data.debrisType}</td>
              <td>{data.debrisDescription}</td>
              <td>{data.coordinates}</td>
              <td>{data.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
