import React from 'react';
import BecarioChartRow from './BecarioChartRow';

class BecarioChart extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      becarioList: []
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          becarioList: data.data
        })
      })
      .catch(error => console.log(error))
  }

  actualizarRegistros() {
      this.apiCall('https://scpe-umt.herokuapp.com/becarios/read')
  }

  componentDidMount() {
    this.actualizarRegistros()
  }

  render() {
    let contenido;
    if(this.state.becarioList === '') {
      contenido = <p>Sin registros...</p>
    } else {
      contenido = <tbody> { this.state.becarioList.map( ( row , i) => { return <BecarioChartRow { ...row} key={i}/> }) } </tbody>    
    }

    return (
      <div className="lista-de-registros">
        <br />
        <h2>Control de Becarios</h2>
        <hr />
        
        <hr />
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th scope="col"># Becario</th>
                    <th scope="col">Nombre</th>
                    <th colspan="2">Action</th>
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

export default BecarioChart;