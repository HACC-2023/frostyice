import EventCollapse from "./common/EventCollapse";

const RemovalAndStorage = ({ event }) => {
  return (
    <EventCollapse title="Removal and Storage">
      <div>
        <section className="flex md:mb-6">
          <button className="btn btn-secondary justify-self-end">Edit</button>
          {/* When edit is clicked, change elements into inputs */}
          {/* <input className="" value={event.debrisSize} /> */}
        </section>
        <div className="flex flex-col md:flex-row justify-evenly gap-3 my-3 py-6 px-3 bg-base-100 rounded-xl">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="md:text-xl font-bold">Debris Size</h1>
              <p>{event.debrisSize}</p>
            </div>
            <div>
              <h1 className="md:text-xl font-bold">Debris Mass</h1>
              <p>{event.debrisMass}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="md:text-xl font-bold">
                Temporary Storage Location
              </h1>
              <p>{event.tempStorage}</p>
            </div>
            <div>
              <h1 className="md:text-xl font-bold">Environmental Damage</h1>
              <p className="break-words">{event.assessedEnvDamage}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="md:text-xl font-bold">Removed By</h1>
              <p>{event.removedBy}</p>
            </div>
            <div>
              <h1 className="md:text-xl font-bold">Removal Date/s</h1>
              <p>
                {event.removalStartDate}-{event.removalEndDate}
              </p>
            </div>
          </div>
        </div>
        {event.multiEventShipment && (
          <>
            <div className="divider" />
            <div>
              Multievent shipment
            </div>
          </>
        )}
        <section className="flex justify-end gap-3 py-3">
          <button className="btn btn-outline">Undo Step</button>
          <button className="btn btn-primary">Mark as Removed</button>
        </section>
      </div>
    </EventCollapse>
  );
};

export default RemovalAndStorage;
