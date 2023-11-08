const DashboardTable = ({events}) => {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="table bg-white text-gray-500">
        <thead>
          <tr className="text-gray-600">
            <td className="w-32">Date</td>
            <td className="w-20">Status</td>
            <td>Debris Type</td>
            <td>Debris Env. Description</td>
            <td>Closest Island</td>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.reportedDate.split('T')[0]}</td>
              <td className="text-gray-500 font-semibold">{event.status}</td>
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

export default DashboardTable;
