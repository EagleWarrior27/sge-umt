function UserChartRow(props){
  return (
    <tr>
      <td>{props.alumnos.nombre}</td>
      <td>{props.alumnos.procedencia}</td>
      <td>{props.equipos.tipo}</td>
      <td>{props.equipos.id}</td>
      <td>{props.tipo}</td>
      <td>{props.fecha_p}</td>
      <td>{props.estado}</td>
      <td>{props.fecha_d}</td>
      <td>{props.becarios.nombre}</td>
    </tr>
  )
}
              
export default UserChartRow;