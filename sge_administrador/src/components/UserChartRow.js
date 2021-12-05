function UserChartRow(props){
    return (
      <tr>
        <td>{props.nombre}</td>
        <td>{props.email}</td>
        <td>{props.estado}</td>
      </tr>
    )
  }
              
  export default UserChartRow;