const Event = () => {
  return (
    <div className="w-full min-h-full flex justify-center">
      <div className="min-h-screen p-5 w-full md:max-w-7xl">
        <div className="flex justify-center">
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-primary">Event Reported</li>
            <li className="step step-primary">Removal &amp; Storage</li>
            <li data-content="●" className="step step-primary">
              Sorting
            </li>
            <li className="step">Disposal</li>
          </ul>
        </div>
        <div>
          <details className="collapse bg-base-200">
            <summary className="collapse-title text-xl font-medium">Event Reported</summary>
            <div className="collapse-content"> 
              <p>content</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Event;
