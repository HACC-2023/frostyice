import PropTypes from 'prop-types';

const SortingRow = ({ sortedMaterial }) => {
  return (
    <tr>
      <td>{sortedMaterial.material}</td>
      <td>{sortedMaterial.mass}</td>
      <td>{sortedMaterial.polymers}</td>
      <td>
        <button className="btn btn-outline btn-sm">Edit</button>
      </td>
    </tr>
  )
}

SortingRow.propTypes = {
  sortedMaterial: PropTypes.object.isRequired
};

export default SortingRow;