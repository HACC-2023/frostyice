import EventCollapse from "./common/EventCollapse";
import DisposalRow from "./disposal/DisposalRow";

const Disposal = ({ event }) => {
  const sortedMaterial = {
    material: "Nets",
    island: "Oahu",
    mass: "32 kg",
    polymers: "Nylon",
    eventId: "abcd1234",
    disposalDate: new Date(1699238545839),
    disposalMechanism: "Burned",
  };

  return (
    <EventCollapse title="Disposal">
      <div className="flex flex-col gap-3 my-3 py-6 px-3 bg-base-100 rounded-xl">
        <div className="overflow-x-auto w-full flex items-start rounded-xl p-3 h-96 border border-neutral">
          <table className="table table-zebra table-pin-rows">
            <thead>
              <tr>
                <th>Material</th>
                <th>Mass</th>
                <th>Polymers</th>
                <th>Disposal Mechanism</th>
                <th>Disposal Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {/* Later on use all items */}
              <DisposalRow sortedMaterial={sortedMaterial} />
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

export default Disposal;
