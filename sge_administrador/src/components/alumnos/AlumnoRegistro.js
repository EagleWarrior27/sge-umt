import React from 'react';
import axios from 'axios';

class Alumno extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      matricula: "",
      nombre: "",
      procedencia: "",  
    }
  }
  
  render(){
    return (
        <section className="App-section">
            <br />
          <h2>Registro de Alumno</h2>
          <hr align="center" noshade="noshade" size="10"  width="80%" />
          
          <div class="form-row justify-content-center">
            <div class="form-group col-md-7">
              <label for="inputPassword4">Matrícula</label>
              <input type="number" class="form-control"
                value={this.state.matricula}
                onChange={(value)=> this.setState({matricula:value.target.value})}
              />
            </div>

        <br />
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

          <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Registrar</button>
        </section>
      );
    }
  
    sendSave() {
      ///En caso de no haber seleccionado algún dato
      if (this.state.matricula === "") {
        alert("Ingrese la matrícula del Alumno");
      }
      else if (this.state.nombre === "") {
        alert("Ingrese el nombre del Alumno");
      }
      else if (this.state.procedencia === "") {
        alert("Ingrese la procedencia del Alumno");
      } else {
        let url = "https://scpe-umt.herokuapp.com/alumnos/create";
		    
        let alumno = {
			    id: this.state.matricula,
			    nombre: this.state.nombre,
			    procedencia: this.state.procedencia,
		    }
		    
			  axios.post(url, alumno)
		      .then(response => {
			       alert('Registro completo');
		      })
        
          this.setState({matricula: ""})
          this.setState({nombre:""})
          this.setState({procedencia:""})
      }
    }
  }
  
  export default Alumno;
  