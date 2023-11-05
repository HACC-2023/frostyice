import SortingRow from "./sorting/SortingRow";

const { default: EventCollapse } = require("./common/EventCollapse");

const Sorting = ({ event }) => {
  // need to send a get request here to get all of the materials from the event

  const sortedMaterial = {
    sortedDate: new Date(1699143329284),
    material: "Nets",
    island: "Oahu",
    mass: "32 kg",
    polymers: "Nylon",
    eventId: "abcd1234",
    disposalDate: new Date(1709143329284),
    disposalMechanism: "Recycled",
  };

  return (
    <EventCollapse title="Sorting">
      <section className="flex justify-between md:mt-10">
        <h1>Sorting Date: {sortedMaterial.sortedDate.toLocaleString("en-US")}</h1>
        <button className="btn btn-secondary">Add Component</button>
      </section>
      <div className="flex flex-col gap-3 my-3 py-6 px-3 bg-base-100 rounded-xl">
        <div className="overflow-x-auto w-full flex items-start rounded-xl p-3 h-96 border border-neutral">
          <table className="table table-zebra table-pin-rows">
            <thead>
              <tr>
                <th>Material</th>
                <th>Mass</th>
                <th>Polymers</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {/* Later on use all items */}
              <SortingRow sortedMaterial={sortedMaterial} />
            </tbody>
          </table>
        </div>
        <section className="flex justify-end gap-3 py-3">
          <button className="btn btn-outline">Undo Step</button>
          <button className="btn btn-primary">Mark as Completed</button>
        </section>
      </div>
    </EventCollapse>
  );
};

export default Sorting;
