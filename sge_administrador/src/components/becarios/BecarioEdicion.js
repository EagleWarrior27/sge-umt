import React from 'react';
import axios from 'axios';
import bcryptjs from 'bcryptjs';

class BecarioEdicion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: "",
      nombre: "",
      contrasenia: "",  
    }
  }

  componentDidMount(){
    //Parámetros del Id
    let becarioId= this.props.match.params.id;

    const url = "https://scpe-umt.herokuapp.com/becarios/get/"+ becarioId;
    axios.get(url)
    .then(response => {
      let data = response.data.data;
      this.setState({
        id: data.id,
        nombre: data.nombre
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
          <h2>Edición de Becario</h2>
          <hr align="center" noshade="noshade" size="10"  width="80%" />
          <div class="alert alert-info"># Becario: {this.state.id}</div>

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
              <label for="inputPassword4">Contraseña: </label>
              <input type="password" class="form-control"
                value={this.state.contrasenia}
                onChange={(value)=> this.setState({contrasenia:value.target.value})}
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
        alert("Ingrese el nombre del Becario");
      }
      else if (this.state.contrasenia === "") {
        alert("Ingrese la contraseña del Becario");
      } else {
        let idBecario = this.state.id;

        let url = "https://scpe-umt.herokuapp.com/becarios/update/" + idBecario;
        let Becario = {
		  id: idBecario,
		  nombre: this.state.nombre,
		  password: bcryptjs.hashSync(this.state.contrasenia, 10),
		}
		    
		axios.put(url, Becario)
		  .then(response => {
			alert('Actualización completa');
		  })
        
        this.setState({nombre:""})
        this.setState({contrasenia:""})
      }
    }
  }
  
  export default BecarioEdicion;
  