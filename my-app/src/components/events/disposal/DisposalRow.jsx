import PropTypes from "prop-types";
import EditDisposalModal from "./EditDisposalModal";


const DisposalRow = ({ sortedMaterial }) => {
  return (
    <tr>
      <td>{sortedMaterial.material}</td>
      <td>{sortedMaterial.mass}</td>
      <td>{sortedMaterial.polymers}</td>
      <td>{sortedMaterial.disposalMechanism}</td>
      <td>{sortedMaterial.disposalDate.toLocaleDateString("en-US")}</td>
      <td>
        <button
          className="btn btn-ghost"
          onClick={() => document.getElementById("edit_disposal_modal").showModal()}
        >
          Edit
        </button>
        <EditDisposalModal id="edit_disposal_modal" sortedMaterial={sortedMaterial}/>
        <button className="btn btn-ghost">Delete</button>
      </td>
    </tr>
  );
};

DisposalRow.propTypes = {
  sortedMaterial: PropTypes.shape({
    material: PropTypes.string.isRequired,
    mass: PropTypes.number.isRequired,
    polymers: PropTypes.string.isRequired,
    disposalDate: PropTypes.instanceOf(Date).isRequired,
    disposalMechanism: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisposalRow;
