import React from 'react';
import axios from 'axios';

class AlumnoEliminacion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      matricula: "",
      nombre: "",
      procedencia: "",  
    }
  }

  componentDidMount(){
    //Parámetros del Id
    let alumnoId= this.props.match.params.id;

    const url = "https://scpe-umt.herokuapp.com/alumnos/get/"+ alumnoId;
    axios.get(url)
    .then(response => {
      let data = response.data.data;
      this.setState({
        matricula: data.id,
        nombre: data.nombre,
        procedencia: data.procedencia
      })
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  
  render(){
    return (
        <section className="App-section">
            <br />
          <h2>Eliminación de Alumno</h2>
          <hr align="center" noshade="noshade" size="10" />
          <div class="alert alert-info">Matrícula: {this.state.matricula}</div>
          <br />
          <div class="alert alert-info">Matrícula: {this.state.nombre}</div>
          <br />
          <div class="alert alert-info">Matrícula: {this.state.procedencia}</div>

          <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Eliminar</button>
        </section>
      );
    }
  
    sendSave() {     
      let idAlumno = this.state.matricula;
      
      let url = "https://scpe-umt.herokuapp.com/alumnos/delete/" + idAlumno;
      axios.delete(url)
	    .then(response => {
		  alert('Eliminación completa');
		})
    }
  }
  
  export default AlumnoEliminacion;
  