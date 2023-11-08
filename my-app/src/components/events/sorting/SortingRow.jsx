import PropTypes from "prop-types";
import EditComponentModal from "./EditComponentModal";

const SortingRow = ({ sortedMaterial, event }) => {
  const modalId = `edit_component_modal_${sortedMaterial._id}`;
  return (
    <tr>
      <td>{sortedMaterial.material}</td>
      <td>{sortedMaterial.mass}</td>
      <td>{sortedMaterial.polymers}</td>
      <td className="flex gap-2">
        <button
          className="btn btn-outline btn-sm"
          onClick={() =>
            document.getElementById(modalId).showModal()
          }
        >
          Edit
        </button>
        <EditComponentModal id={modalId} event={event} sortedMaterial={sortedMaterial}/>
        <button className="btn btn-outline btn-sm">Delete</button>
      </td>
    </tr>
  );
};

SortingRow.propTypes = {
  sortedMaterial: PropTypes.object.isRequired,
};

export default SortingRow;
