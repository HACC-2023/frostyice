import { TrashIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const TableRow = ({ org, index }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{org.name}</td>
      <td>
        <button>
          <TrashIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

export default TableRow;

TableRow.propTypes = {
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};