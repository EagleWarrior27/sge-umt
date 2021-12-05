import React from 'react';
import imagenDefault from '../../assets/images/imagen.jfif';

class LastEquipoInBD extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      equipoDetails: [],
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          equipoDetails: data.data
        })
      })
      .catch(error => console.log(error))
  }

  obtenerProduto() {
    this.apiCall('https://scpe-umt.herokuapp.com/equipos/last')
  }

  componentDidMount() {
    this.obtenerProduto()
  }

  render() {
    let idEquipo;
    let tipoEquipo;
    let imagenEquipo;

    if(this.state.equipoDetails == '') {
      idEquipo = <p>No se pudo obtener el id del equipo</p>
      tipoEquipo = <p>No se pudo obtener el tipo de equipo</p>
      imagenEquipo = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ imagenDefault } alt=" DefaultImage"/>
    } else {
      let equipoId = this.state.equipoDetails[0].id;
      idEquipo = <b> { equipoId } </b> 

      let equipoTipo = this.state.equipoDetails[0].tipo;
      tipoEquipo = <i> { equipoTipo } </i>
      
      let equipoImg = 'https://sge-operador.herokuapp.com/images/equipos/' + this.state.equipoDetails[0].imagen;
      imagenEquipo = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ equipoImg } alt=" DefaultImage"/>
    }

    return (
      <div className="col-lg-6 mb-4 lista-de-registros">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Último equipo en BD</h5>
          </div>
          
          <div className="card-body">
            <div className="text-center">
              { imagenEquipo }
            </div>
          
            <p> { idEquipo } </p>
            <p> { tipoEquipo } </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LastEquipoInBD;