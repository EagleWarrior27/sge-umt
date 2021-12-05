import { Link } from 'react-router-dom';

function BecarioChartRow(props){
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.nombre}</td>
      <td>
        <Link class="btn btn-outline-warning" to={"/BecarioEdicion/" + props.id}> Editar </Link>
      </td>
      <td>
        <Link class="btn btn-outline-danger" to={"/BecarioEliminacion/" + props.id}> Eliminar </Link>
      </td>
    </tr>
  )
}
              
export default BecarioChartRow;