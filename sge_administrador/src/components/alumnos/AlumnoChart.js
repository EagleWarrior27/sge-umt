import React from 'react';
import AlumnoChartRow from './AlumnoChartRow';


class AlumnoChart extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      alumnoList: []
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          alumnoList: data.data
        })
      })
      .catch(error => console.log(error))
  }

  actualizarRegistros() {
      this.apiCall('https://scpe-umt.herokuapp.com/alumnos/read')
  }

  componentDidMount() {
    this.actualizarRegistros()
  }

  render() {
    let contenido;
    if(this.state.alumnoList === '') {
      contenido = <p>Sin registros...</p>
    } else {
      contenido = <tbody> { this.state.alumnoList.map( ( row , i) => { return <AlumnoChartRow { ...row} key={i}/> }) } </tbody>    
    }

    return (
      <div className="lista-de-registros">
        <br />
        <h2>Control de Alumnos</h2>
        <hr />
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th scope="col">Matrícula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Procedencia</th>
                    <th colspan="2">Acciones</th>
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

export default AlumnoChart;