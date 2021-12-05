import React from 'react';
import axios from 'axios';

class AlumnoEdicion extends React.Component{
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
          <h2>Edición de Alumno</h2>
          <hr align="center" noshade="noshade" size="10"  width="80%" />
          <div class="alert alert-info">Matrícula: {this.state.matricula}</div>

          <div class="form-row justify-content-center">
            <div class="form-group col-md-7">
              <label for="inputPassword4">Nombre</label>
              <input type="text" class="form-control"
                value={this.state.nombre}
                onChange={(value)=> this.setState({nombre:value.target.value})}
              />
            </div>
            <br />

            <div class="form-group col-md-7">
              <label for="inputPassword4">Procedencia</label>
              <input type="text" class="form-control"
                value={this.state.procedencia}
                onChange={(value)=> this.setState({procedencia:value.target.value})}
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Editar</button>
        </section>
      );
    }
  
    sendSave() {
      ///En caso de no haber seleccionado algún dato
      if (this.state.nombre === "") {
        alert("Ingrese el nombre del Alumno");
      }
      else if (this.state.procedencia === "") {
        alert("Ingrese la procedencia del Alumno");
      } else {
        let idAlumno = this.state.matricula;
        let url = "https://scpe-umt.herokuapp.com/alumnos/update/" + idAlumno;
		    
        let alumno = {
			    id: idAlumno,
			    nombre: this.state.nombre,
			    procedencia: this.state.procedencia,
		    }
		    
			  axios.put(url, alumno)
		      .then(response => {
			       alert('Actualización completa');
		      })
        
        this.setState({nombre:""})
        this.setState({procedencia:""})
      }
    }
  }
  
  export default AlumnoEdicion;
  