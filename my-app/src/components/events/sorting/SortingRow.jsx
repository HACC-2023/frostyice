import PropTypes from "prop-types";
import EditComponentModal from "./EditComponentModal";

const SortingRow = ({ sortedMaterial, event }) => {
  return (
    <tr>
      <td>{sortedMaterial.material}</td>
      <td>{sortedMaterial.mass}</td>
      <td>{sortedMaterial.polymers}</td>
      <td>
        <button
          className="btn btn-outline btn-sm"
          onClick={() =>
            document.getElementById("edit_component_modal").showModal()
          }
        >
          Edit
        </button>
        <EditComponentModal id="edit_component_modal" event={event} sortedMaterial={sortedMaterial}/>
      </td>
    </tr>
  );
};

SortingRow.propTypes = {
  sortedMaterial: PropTypes.object.isRequired,
};

export default SortingRow;
