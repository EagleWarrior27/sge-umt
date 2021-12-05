import React from 'react';
import PrestamoChartRow from './PrestamoChartRow';


class PrestamoChart extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      prestamoList: []
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
            prestamoList: data.data
        })
        
        console.log(this.state.prestamoList)

      })
      .catch(error => console.log(error))
  }

  actualizarRegistros(categoria) {
    if(categoria === "Lista") {
      this.apiCall('https://scpe-umt.herokuapp.com/prestamos/read');
    } else if(categoria === "Activos") {
      this.apiCall('https://scpe-umt.herokuapp.com/prestamos/activo');
    } else {
      this.apiCall('https://scpe-umt.herokuapp.com/prestamos/devuelto');
    }
  }

  componentDidMount() {
    this.actualizarRegistros("Lista")
  }

  render() {
    let contenido;
    if(this.state.prestamoList === '') {
      contenido = <p>Sin registros...</p>
    } else {
      contenido = <tbody> { this.state.prestamoList.map( ( row , i) => { return <PrestamoChartRow { ...row} key={i}/> }) } </tbody>    
    }

    return (
      <div className="lista-de-registros">
        <br />
        <h2>Control de Préstamos</h2>
        <button type="submit" class="btn btn-outline-info" onClick={()=>this.actualizarRegistros("Lista")}> Registros </button>
        <button type="submit" class="btn btn-outline-success" onClick={()=>this.actualizarRegistros("Activos")}> Activos </button>
        <button type="submit" class="btn btn-outline-warning" onClick={()=>this.actualizarRegistros("Devueltos")}> Devueltos </button>
        <hr />

        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th scope="col">Alumno</th>
                    <th scope="col">Procedencia</th>
                    <th scope="col">Equipo</th>
                    <th scope="col"># Serie</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Fecha Préstamo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha Devolución</th>
                    <th scope="col">Becario</th>
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

export default PrestamoChart;