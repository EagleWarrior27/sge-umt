import React from 'react';
import imagenDefault from '../../assets/images/imagen.jfif';

class LastAlumnoInBD extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      alumnoDetails: [],
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          alumnoDetails: data.data
        })
        console.log(data.data)
      })
      .catch(error => console.log(error))
  }

  obtenerProduto() {
    this.apiCall('https://scpe-umt.herokuapp.com/alumnos/last')
  }

  componentDidMount() {
    this.obtenerProduto()
  }

  render() {
    let matriculaAlumno;
    let nombreAlumno;
    let procedenciaAlumno;

    if(this.state.alumnoDetails == '') {
      matriculaAlumno = <p>No se pudo obtener la matricula del alumno</p>
      nombreAlumno = <p>No se pudo obtener el nombre del alumno</p>
      procedenciaAlumno = <p>No se pudo obtener la procedencia del alumno</p>;     
    } else {
      let alumnoMatricula = this.state.alumnoDetails[0].id;
      matriculaAlumno = <b> { alumnoMatricula } </b> 

      let alumnoNombre = this.state.alumnoDetails[0].nombre;
      nombreAlumno = <i> { alumnoNombre } </i>
      
      let alumnoProcedencia = this.state.alumnoDetails[0].procedencia;
      procedenciaAlumno = <u> { alumnoProcedencia } </u> 
    }

    return (
      <div className="col-lg-6 mb-4 lista-de-registros">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Último alumno en BD</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ imagenDefault } alt=" DefaultImage"/>
          </div>
          
          <p> { matriculaAlumno } </p>
          <p> { nombreAlumno } </p>
          <p> { procedenciaAlumno } </p>
        </div>
      </div>
    </div>
    );
  }
}

export default LastAlumnoInBD;

  