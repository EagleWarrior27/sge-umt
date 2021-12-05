import React from 'react';
import axios from 'axios';

class BecarioEliminacion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: "",
      nombre: "",  
    }
  }

  componentDidMount(){
    //Parámetros del Id
    let becarioId = this.props.match.params.id;

    const url = "https://scpe-umt.herokuapp.com/becarios/get/"+ becarioId;
    axios.get(url)
    .then(response => {
      let data = response.data.data;
      this.setState({
        id: data.id,
        nombre: data.nombre,
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
        <h2>Eliminación de Becario</h2>
        <hr align="center" noshade="noshade" size="10" />
          
        <div class="alert alert-info">Id: {this.state.id}</div>
        <br />
        <div class="alert alert-info">Nombre: {this.state.nombre}</div>
          
        <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Eliminar</button>
      </section>
    );
  }

  sendSave() {     
    let idBecario = this.state.id;
      
    let url = "https://scpe-umt.herokuapp.com/becarios/delete/" + idBecario;
    axios.delete(url)
	  .then(response => {
		alert('Eliminación completa');
	  })
    }
}
  
  export default BecarioEliminacion;
  