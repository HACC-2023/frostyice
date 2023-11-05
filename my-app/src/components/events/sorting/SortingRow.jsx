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

export default SortingRow;