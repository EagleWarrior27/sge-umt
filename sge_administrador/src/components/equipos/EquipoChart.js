import React from 'react';
import EquipoChartRow from './EquipoChartRow';


class EquipoChart extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      equipoList: []
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          equipoList: data.data
        })
        
        console.log(this.state.equipoList)

      })
      .catch(error => console.log(error))
  }

  actualizarRegistros(categoria) {
    if(categoria === "Lista") {
      this.apiCall('https://scpe-umt.herokuapp.com/equipos/read');
    } else if(categoria === "Disponibles") {
      this.apiCall('https://scpe-umt.herokuapp.com/equipos/disponible');
    } else {
      this.apiCall('https://scpe-umt.herokuapp.com/equipos/prestado');
    }
  }

  componentDidMount() {
    this.actualizarRegistros("Lista")
  }

  render() {
    let contenido;
    if(this.state.equipoList == '') {
      contenido = <p>Sin registros...</p>
    } else {
      contenido = <tbody> { this.state.equipoList.map( ( row , i) => { return <EquipoChartRow { ...row} key={i}/> }) } </tbody>    
    }

    return (
      <div className="lista-de-registros">
        <br />
        <h2>Control de Equipos</h2>
        <button type="submit" class="btn btn-outline-info" onClick={()=>this.actualizarRegistros("Lista")}> Registros </button>
        <button type="submit" class="btn btn-outline-success" onClick={()=>this.actualizarRegistros("Disponibles")}> Disponibles </button>
        <button type="submit" class="btn btn-outline-warning" onClick={()=>this.actualizarRegistros("Prestados")}> Prestados </button>
        <hr />

        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th scope="col"># Serie</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col"># Inventario</th>
                    <th scope="col">Disponibilidad</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                
                { contenido }
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EquipoChart;