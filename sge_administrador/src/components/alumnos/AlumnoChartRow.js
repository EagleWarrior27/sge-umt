import { Link } from "react-router-dom";

function AlumnoChartRow(props){
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.nombre}</td>
      <td>{props.procedencia}</td>
      <td>
        <Link class="btn btn-outline-warning" to={"/AlumnoEdicion/" + props.id}> Editar </Link>
      </td>
      <td>
        <Link class="btn btn-outline-danger" to={"/AlumnoEliminacion/" + props.id}> Eliminar </Link>
      </td>
    </tr>
  )
}
              
export default AlumnoChartRow;