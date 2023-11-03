import Disposal from "@/components/events/Disposal";
import EventRemoval from "@/components/events/EventRemoval";
import RemovalAndStorage from "@/components/events/RemovalAndStorage";
import Sorting from "@/components/events/Sorting";

const Event = () => {
  return (
    <div className="w-full min-h-full flex justify-center">
      <div className="min-h-screen p-5 w-full md:max-w-7xl flex flex-col gap-5">
        <div className="flex justify-center py-12">
          <ul className="steps steps-horizontal">
            <li className="step step-primary">Event Reported</li>
            <li className="step step-primary">Removal &amp; Storage</li>
            <li data-content="●" className="step step-primary">
              Sorting
            </li>
            <li className="step">Disposal</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <EventRemoval />
          <RemovalAndStorage />
          <Sorting />
          <Disposal />
        </div>
      </div>
    </div>
  );
};

export default Event;
