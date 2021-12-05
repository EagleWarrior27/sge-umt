import React from 'react';
import imagenDefault from '../../assets/images/imagen.jfif';

class LastBecarioInBD extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      becarioDetails: [],
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
          becarioDetails: data.data
        })
      })
      .catch(error => console.log(error))
  }

  obtenerProduto() {
    this.apiCall('https://scpe-umt.herokuapp.com/becarios/last')
  }

  componentDidMount() {
    this.obtenerProduto()
  }

  render() {
    let idBecario;
    let nombreBecario;
    let imagenBecario;

    if(this.state.becarioDetails == '') {
      idBecario = <p>No se pudo obtener el id del becario</p>
      nombreBecario = <p>No se pudo obtener el nombre del becario</p>
      imagenBecario = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ imagenDefault } alt=" DefaultImage"/>
    } else {
      let becarioId = this.state.becarioDetails[0].id;
      idBecario = <b> { becarioId } </b> 

      let becarioNombre = this.state.becarioDetails[0].nombre;
      nombreBecario = <i> { becarioNombre } </i>
      
      let becarioImg = 'https://sge-operador.herokuapp.com/images/becarios/' + this.state.becarioDetails[0].imagen;
      imagenBecario = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ becarioImg } alt=" DefaultImage"/>
    }

    return (
      <div className="col-lg-6 mb-4 lista-de-registros">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Último becario en BD</h5>
          </div>
          
          <div className="card-body">
            <div className="text-center">
              { imagenBecario }
            </div>
          
            <p> { idBecario } </p>
            <p> { nombreBecario } </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LastBecarioInBD;