import React from 'react';
import ProductChartRow from './ProductChartRow';


class UserChart extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      productList: []
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
            productList: data.data
        })
        
        console.log(data.data)
      })
      .catch(error => console.log(error))
  }

  actualizarRegistros() {
      this.apiCall('http://localhost:8080/api/products')
  }

  componentDidMount() {
    this.actualizarRegistros()
  }

  render() {
    let contenido;
    if(this.state.productList == '') {
      contenido = <p>Sin registros...</p>
    } else {
      contenido = <tbody> { this.state.productList.map( ( row , i) => { return <ProductChartRow { ...row} key={i}/> }) } </tbody>    
    }

    return (
      <div>
        <button onClick={() => this.actualizarRegistros()}>Actualizar</button>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Equipo</th>
                    <th>Liga</th>
                    <th>Marca</th>
                    <th>Tipo</th>
                    <th>Temporada</th>
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

export default UserChart;