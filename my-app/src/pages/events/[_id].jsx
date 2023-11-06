import Disposal from "@/components/events/Disposal";
import EventRemoval from "@/components/events/EventReported";
import ProgressBar from "@/components/events/ProgressBar";
import RemovalAndStorage from "@/components/events/RemovalAndStorage";
import Sorting from "@/components/events/Sorting";

const dummyEvent = {
  _id: "abcd1234",
  status: "Disposal",
  multiEventShipment: true,
  lat: 151,
  long: 21,
  detectedLocation: "Oahu",
  detectedDate: new Date(1699057615774),
  publicType: "A mass of netting and/or fishing gear",
  publicContainerFullness: "Did not find a container/drum/cylinder",
  publicClaimBoat: "yes",
  publicLocationDesc: "At sea, within three miles of nearest land in the shore break",
  publicDebrisDesc: "Caught on the reef or is partially buried in sand",
  publicBiofoulingRating: 10,
  publicContact: {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@foo.com",
    phoneNumber: "808-123-4567",
  },
  imageUrl: "imageURL",
  dibsBy: "organizationID",
  removedBy: "organizationID",
  removalStartDate: new Date("2023-12-12"),
  removalEndDate: new Date("2023-12-12"),
  debrisSize: 24,
  debrisMass: 10,
  tempStorage: "CMDR Hub",
  assessedEnvDamage: "Corals are damaged from the entangled nets",
};

const EventPage = () => {
  return (
    <div className="w-full min-h-full flex justify-center">
      <div className="min-h-screen p-5 w-full md:max-w-7xl flex flex-col gap-5">
        <ProgressBar status={dummyEvent.status} />
        <div className="flex flex-col gap-2">
          <EventRemoval event={dummyEvent} />
          <RemovalAndStorage event={dummyEvent} />
          <Sorting event={dummyEvent} />
          <Disposal event={dummyEvent} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
