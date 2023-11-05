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

export default DisposalRow;
