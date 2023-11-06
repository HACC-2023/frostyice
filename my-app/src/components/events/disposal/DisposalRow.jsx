import PropTypes from "prop-types";
import EditDisposalModal from "./EditDisposalModal";


const DisposalRow = ({ sortedMaterial }) => {
  return (
    <tr>
      <td>{sortedMaterial.material ?? "-"}</td>
      <td>{sortedMaterial.mass ?? "-"}</td>
      <td>{sortedMaterial.polymers ?? "-"}</td>
      <td>{sortedMaterial.disposalMechanism ?? "-"}</td>
      <td>{sortedMaterial.disposalDate ? sortedMaterial.disposalDate.toLocaleDateString("en-US") : "-"}</td>
      <td className="flex gap-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => document.getElementById("edit_disposal_modal").showModal()}
        >
          Edit
        </button>
        <EditDisposalModal id="edit_disposal_modal" sortedMaterial={sortedMaterial}/>
        <button className="btn btn-sm btn-outline">Delete</button>
      </td>
    </tr>
  );
};

DisposalRow.propTypes = {
  sortedMaterial: PropTypes.shape({
    material: PropTypes.string.isRequired,
    mass: PropTypes.number.isRequired,
    polymers: PropTypes.string.isRequired,
    disposalDate: PropTypes.instanceOf(Date) || null,
    disposalMechanism: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisposalRow;
