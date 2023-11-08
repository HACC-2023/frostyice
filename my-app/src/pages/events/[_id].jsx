import Disposal from "@/components/events/Disposal";
import EventRemoval from "@/components/events/EventReported";
import ProgressBar from "@/components/events/ProgressBar";
import RemovalAndStorage from "@/components/events/RemovalAndStorage";
import Sorting from "@/components/events/Sorting";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const dummyEvent = {
  _id: "abcd1234",
  status: "Disposal",
  multiEventShipment: true,
  mapLat: 151,
  mapLong: 21,
  closestIsland: "Oahu",
  reportedDate: new Date(1699057615774),
  publicType: "A mass of netting and/or fishing gear",
  publicLocationDesc:
    "At sea, within three miles of nearest land in the shore break",
  publicDebrisEnvDesc: "Caught on the reef or is partially buried in sand",
  publicBiofoulingRating: 10,
  publicContact: {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@foo.com",
    phoneNumber: "808-123-4567",
  },
  imageUrl: "https://www.northjersey.com/gcdn/-mm-/3122db09d8b948644963dcec9f411aed82a69136/c=0-320-680-704/local/-/media/2018/03/23/Bergen/NorthJersey/636574238651800185-ax053-360d-9.jpg?width=680&height=340&fit=crop&format=pjpg&auto=webp",
  dibsByOrgId: "organizationID",
  removedByOrgId: "organizationID",
  removalStartDate: new Date("2023-12-12"),
  removalEndDate: new Date("2023-12-12"),
  debrisSize: 24,
  debrisMass: 10,
  tempStorage: "CMDR Hub",
  assessedEnvDamage: "Corals are damaged from the entangled nets",
};

const EventPage = () => {
  const router = useRouter();
  
  const _id = router.query._id;
  console.log("router", _id);

  const { data } = useSWR(
    _id ? `/api/mongo/event/get-event-by-id/${_id}` : null,
    _id ? fetcher : null,
    { refreshInterval: 1000 }
  );

  console.log("data", data);
  if (data) {
    return (
      <div className="w-full min-h-full flex justify-center">
        <div className="min-h-screen p-5 w-full md:max-w-7xl flex flex-col gap-5">
          <ProgressBar status={data.status} />
          <div className="flex flex-col gap-2">
            <EventRemoval event={data} />
            <RemovalAndStorage event={data} />
            <Sorting event={data} />
            <Disposal event={data} />
          </div>
        </div>
      </div>
    );
  }
};

export default EventPage;
