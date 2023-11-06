import { STATUS } from "@/constants/constants";

const ProgressBar = ({ status }) => {
  if (status === STATUS[0]) {
    return (
      <div className="flex justify-center py-12">
        <ul className="steps steps-horizontal">
          <li data-content="✓" className="step step-primary">
            Event Reported
          </li>
          <li data-content="●" className="step">
            Removal &amp; Storage
          </li>
          <li data-content="●" className="step">
            Sorting
          </li>
          <li data-content="●" className="step">
            Disposal
          </li>
        </ul>
      </div>
    );
  }
  if (status === STATUS[1]) {
    return (
      <div className="flex justify-center py-12">
        <ul className="steps steps-horizontal">
          <li data-content="✓" className="step step-primary">
            Event Reported
          </li>
          <li data-content="●" className="step step-primary">
            Removal &amp; Storage
          </li>
          <li data-content="●" className="step">
            Sorting
          </li>
          <li data-content="●" className="step">
            Disposal
          </li>
        </ul>
      </div>
    );
  }
  if (status === STATUS[2]) {
    return (
      <div className="flex justify-center py-12">
        <ul className="steps steps-horizontal">
          <li data-content="✓" className="step step-primary">
            Event Reported
          </li>
          <li data-content="✓" className="step step-primary">
            Removal &amp; Storage
          </li>
          <li data-content="●" className="step step-primary">
            Sorting
          </li>
          <li data-content="●" className="step">
            Disposal
          </li>
        </ul>
      </div>
    );
  }
  if (status === STATUS[3]) {
    return (
      <div className="flex justify-center py-12">
        <ul className="steps steps-horizontal">
          <li data-content="✓" className="step step-primary">
            Event Reported
          </li>
          <li data-content="✓" className="step step-primary">
            Removal &amp; Storage
          </li>
          <li data-content="✓" className="step step-primary">
            Sorting
          </li>
          <li data-content="●" className="step step-primary">
            Disposal
          </li>
        </ul>
      </div>
    );
  }
  if (status === STATUS[4]) {
    return (
      <div className="flex justify-center py-12">
        <ul className="steps steps-horizontal">
          <li data-content="✓" className="step step-primary">
            Event Reported
          </li>
          <li data-content="✓" className="step step-primary">
            Removal &amp; Storage
          </li>
          <li data-content="✓" className="step step-primary">
            Sorting
          </li>
          <li data-content="✓" className="step step-primary">
            Disposal
          </li>
        </ul>
      </div>
    );
  }
  console.log(status);
};

export default ProgressBar;
