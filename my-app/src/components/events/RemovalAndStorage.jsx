import EventCollapse from "./common/EventCollapse";
import EditRemovalModal from "./removal-and-storage/EditRemovalModal";
import RemovalStorageRow from "./removal-and-storage/RemovalStorageRow";

const RemovalAndStorage = ({ event }) => {
  return (
    <EventCollapse title="Removal and Storage">
      <div>
        <section className="flex md:mb-6">
          <button className="btn btn-secondary justify-self-end" onClick={() => {
            document.getElementById("edit_removal_modal_1").showModal();
          }}>Edit</button>
          <EditRemovalModal id="edit_removal_modal_1" event={event} />
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
                {event.removalStartDate.toLocaleDateString()}-{event.removalEndDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        {event.multiEventShipment && (
          <>
            <div className="divider" />
            <h1 className="font-bold text-xl"> Multievent Shipment </h1>
            <div className="flex flex-col gap-3 py-6 px-3 bg-base-100 rounded-xl">
              <div className="flex flex-col md:flex-row gap-3 my-3 py-6 px-3">
                {/* Table */}
                <div className="overflow-x-auto w-full md:w-3/4 flex items-start rounded-xl p-3 h-96 border border-neutral">
                  <table className="table table-zebra table-pin-rows">
                    <thead>
                      <tr>
                        <th>Event ID</th>
                        <th>
                          Debris Size (
                          <var>
                            kg/cm<sup>2</sup>
                          </var>
                          )
                        </th>
                        <th>
                          Debris Mass (<var>kg</var>)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <RemovalStorageRow event={event} />
                    </tbody>
                  </table>
                </div>
                {/* Stats */}
                <div>
                  <div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Debris Size</div>
                      <div className="stat-value">31</div>
                      <div className="stat-desc">
                        <var>
                          Units: kg/cm<sup>2</sup>
                        </var>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Debris Mass</div>
                      <div className="stat-value text-secondary">4,200</div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="steps">
                <li data-content="✓" className="step step-secondary">
                  Shipped
                </li>
                <li data-content="●" className="step step-secondary">
                  Received
                </li>
              </ul>
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
