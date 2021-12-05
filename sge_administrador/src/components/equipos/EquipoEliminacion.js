import React from 'react';
import axios from 'axios';

class EquipoEliminacion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: "",
      tipo: "",
      marca: "",
      modelo: "",
      inventario: ""
    }
  }

  componentDidMount(){
    //Parámetros del Id
    let equipoId = this.props.match.params.id;

    const url = "https://scpe-umt.herokuapp.com/equipos/get/"+ equipoId;
    axios.get(url)
    .then(response => {
      let data = response.data.data;
      this.setState({
        id: data.id,
        tipo: data.tipo,
        marca: data.marca,
        modelo: data.modelo,
        inventario: data.inventario
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
        <h2>Eliminación de Equipo</h2>
        <hr align="center" noshade="noshade" size="10" />
          
        <div class="alert alert-info"># Serie: {this.state.id}</div>
        <br />
        <div class="alert alert-info">Tipo: {this.state.tipo}</div>
        <br />
        <div class="alert alert-info">Marca: {this.state.marca}</div>
        <br />
        <div class="alert alert-info">Modelo: {this.state.modelo}</div>
        <br />
        <div class="alert alert-info"># Inventario: {this.state.inventario}</div>
          
        <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Eliminar</button>
      </section>
    );
  }

  sendSave() {     
    let idEquipo = this.state.id;

    let urlGet = "https://scpe-umt.herokuapp.com/equipos/get/" + idEquipo;
    axios.get(urlGet)
      .then(response => {
        let resultado = response.data.data;
        if(resultado.disponibilidad == "En préstamo") {
          alert('Equipo en préstamo, operación inválida');
        } else {
          let urlDelete = "https://scpe-umt.herokuapp.com/equipos/delete/" + idEquipo;
          axios.delete(urlDelete)
            .then(response => {
              alert('Eliminación completa');
            })
        }
      })
   }
}
  
  export default EquipoEliminacion;
  