import React from 'react';
import imagenDefault from '../../assets/images/imagen.jfif';

class LastPrestamoInBD extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      prestamoDetails: [],
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          prestamoDetails: data.data
        })
        console.log(data.data)
      })
      .catch(error => console.log(error))
  }

  obtenerProduto() {
    this.apiCall('https://scpe-umt.herokuapp.com/prestamos/last')
  }

  componentDidMount() {
    this.obtenerProduto()
  }

  render() {
    let equipoPrestamo;
    let alumnoPrestamo;
    let estadoPrestamo;

    if(this.state.prestamoDetails == '') {
      equipoPrestamo = <p>No se pudo obtener el tipo de equipo prestado</p>
      alumnoPrestamo = <p>No se pudo obtener el nombre del alumno que realizó el préstamo</p>
      estadoPrestamo = <p>No se pudo obtener el estado del préstamo</p>;     
    } else {
      let prestamoEquipo = this.state.prestamoDetails[0].equipos.tipo;
      equipoPrestamo = <b> { prestamoEquipo } </b> 

      let prestamoAlumno = this.state.prestamoDetails[0].alumnos.nombre;
      alumnoPrestamo = <i> { prestamoAlumno } </i>
      
      let prestamoEstado = this.state.prestamoDetails[0].estado;
      estadoPrestamo = <u> { prestamoEstado } </u> 
    }

    return (
      <div className="col-lg-6 mb-4 lista-de-registros">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Último préstamo en BD</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ imagenDefault } alt=" DefaultImage"/>
          </div>
          
          <p> { equipoPrestamo } </p>
          <p> { alumnoPrestamo } </p>
          <p> { estadoPrestamo } </p>
        </div>
      </div>
    </div>
    );
  }
}

export default LastPrestamoInBD;

  