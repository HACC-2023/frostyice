import PropTypes from 'prop-types';

const DisposalRow = ({ sortedMaterial }) => {
  return (
    <tr>
      <td>{sortedMaterial.material}</td>
      <td>{sortedMaterial.mass}</td>
      <td>{sortedMaterial.polymers}</td>
      <td>{sortedMaterial.disposalMechanism}</td>
      <td>
        <button className="btn btn-ghost">Edit</button>
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
    disposalMechanism: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisposalRow;
