import PropTypes from "prop-types";
import EditDisposalModal from "./EditDisposalModal";


const DisposalRow = ({ sortedMaterial }) => {
  const modalId = `edit_disposal_modal_${sortedMaterial._id}`;
  return (
    <tr>
      <td>{sortedMaterial.material ?? "-"}</td>
      <td>{sortedMaterial.mass ?? "-"}</td>
      <td>{sortedMaterial.polymer ?? "-"}</td>
      <td>{sortedMaterial.disposalMechanism ?? "-"}</td>
      <td>{sortedMaterial.disposalDate ? new Date(sortedMaterial.disposalDate).toLocaleDateString("en-US") : "-"}</td>
      <td className="flex gap-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => document.getElementById(modalId).showModal()}
        >
          Edit
        </button>
        <EditDisposalModal id={modalId} sortedMaterial={sortedMaterial}/>
        <button className="btn btn-sm btn-outline">Delete</button>
      </td>
    </tr>
  );
};

DisposalRow.propTypes = {
  sortedMaterial: PropTypes.shape({
    material: PropTypes.string.isRequired,
    mass: PropTypes.number.isRequired,
    polymer: PropTypes.string.isRequired,
    disposalDate: PropTypes.instanceOf(Date) || null,
    disposalMechanism: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisposalRow;
