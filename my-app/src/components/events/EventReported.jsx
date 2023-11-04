import EventCollapse from "./common/EventCollapse";

const EventRemoval = ({ event }) => {
  return (
    <EventCollapse title="Event Reported">
      <div className="p-3 bg-base-100 rounded-xl">
        <header>
          <div className="flex flex-col md:flex-row justify-between">
            <h3 className="font-bold md:text-2xl">Event ID: {event._id}</h3>
            <time className="font-bold md:text-2xl">
              Date Reported: {event.detectedDate.toLocaleString("en-US")}
            </time>
          </div>
        </header>
        <section className="py-3">
          <div className="flex flex-col md:flex-row gap-x-12">
            <div className="w-full md:w-1/2 h-96 bg-primary-content flex justify-center items-center rounded-md my-3">
              <div className="text-base-100">THIS IS WHERE MAP GOES</div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-x-12">
              <section className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl">Location</h2>
                <div className="flex justify-between">
                  <p>Longitude: </p>
                  <p>{event.long}</p>
                </div>
                <div className="flex justify-between">
                  <p>Latitude: </p>
                  <p>{event.lat}</p>
                </div>
                <div className="flex justify-between">
                  <p>Island: </p>
                  <p>{event.detectedLocation}</p>
                </div>
              </section>
              <section className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl">Contact Information</h2>
                <div className="flex justify-between">
                  <p>Email: </p>
                  <p>{event.publicContact.email}</p>
                </div>
                <div className="flex justify-between">
                  <p>Phone Number: </p>
                  <p>{event.publicContact.phoneNumber}</p>
                </div>
                <div className="flex justify-between">
                  <p>Name: </p>
                  <p>
                    {event.publicContact.firstName}{" "}
                    {event.publicContact.lastName}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
        <section className="flex flex-col-reverse md:flex-row justify-between w-full gap-x-12 py-3 mb-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold">Information</h2>
            <ul className="list-disc pl-4 overflow-auto">
              <li className="break-words">{event.publicType}</li>
              <li className="break-words">{event.publicLocationDesc}</li>
              <li className="break-works">{event.publicDebrisDesc}</li>
              <li className="break-words">
                Biofouling Rating - {event.publicBiofoulingRating}
              </li>
              <li className="break-words">
                Container Fullness - {event.publicContainerFullness}
              </li>
              <li className="break-words">
                Contact claims boat - {event.publicClaimBoat}
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 h-96 bg-primary-content rounded-md flex items-center justify-center text-base-100 py-3">
            IMAGE GOES HERE
          </div>
        </section>
        {/* show this section if the event is not claimed */}
      </div>
      <section className="flex justify-end gap-3 py-3">
        <button className="btn btn-outline">Dismiss</button>
        <button className="btn btn-primary">Dispatch Team</button>
      </section>
    </EventCollapse>
  );
};

export default EventRemoval;
