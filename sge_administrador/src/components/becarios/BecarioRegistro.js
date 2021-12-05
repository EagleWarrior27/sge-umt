import React from 'react';
import axios from 'axios';
import bcryptjs from 'bcryptjs';

class Becario extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: "",
      nombre: "",  
      contrasenia: ""
    }
  }
  
  render(){
    return (
      <section className="formulario">
        <br />
        <h2>Registro de Becario</h2>
        <hr align="center" noshade="noshade" size="10"  width="80%" />
          
        <div class="form-row justify-content-center">
          <div class="form-group col-md-7">
            <label for="id"># Becario: </label>
            <input type="number" name="id" class="form-control"
              value={this.state.id}
              onChange={(value) => this.setState({id:value.target.value})}
            />
          </div>

          <div class="form-group col-md-7">
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" class="form-control"
              value={this.state.nombre}
              onChange={(value) => this.setState({nombre:value.target.value})}
            />
          </div>

          <div class="form-group col-md-7">
            <label for="contrasenia">Contraseña:</label>
            <input type="password" name="contrasenia" class="form-control"
              value={this.state.contrasenia}
              onChange={(value) => this.setState({contrasenia:value.target.value})}
            />
          </div>
          
          <br />
        </div>  
        
        <button type="submit" class="btn btn-primary" onClick={()=>this.sendData()}>Registrar</button>
      </section>
    );
  }
  
  sendData() {
    //Validación de datos del formulario
    if (this.state.id === "") {
      alert("Ingrese el id del Becario");
    } else if (this.state.nombre === "") {
      alert("Ingrese el nombre del Becario");
    } else if(this.state.contrasenia === "") {
      alert("Ingrese al contraseña del Becario");
    } else {
      let url = "https://scpe-umt.herokuapp.com/becarios/create";
		    
      let becario = {
        id: this.state.id,
        nombre: this.state.nombre,
        password: bcryptjs.hashSync(this.state.contrasenia, 10),
        imagen: '1638078669415_img.jfif'
      }
		  
			axios.post(url, becario)
		    .then(response => {
			    alert('Registro completo');
		    })
      
        
      this.setState({id: ""})
      this.setState({nombre:""})
      this.setState({contrasenia:""})
    }
  }
}
  
export default Becario;