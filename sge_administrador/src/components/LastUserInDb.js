import React from 'react';
import imagenDefault from '../assets/images/imagen.jfif';

class LastUserInDb extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      userDetails: [],
    }
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.setState({
            userDetails: data.data
        })
        console.log(data.data)
      })
      .catch(error => console.log(error))
  }

  obtenerUsuario() {
    this.apiCall('http://localhost:8080/api/users/user/last')
  }

  componentDidMount() {
    this.obtenerUsuario()
  }

  render() {
    let nombreUsuario;
    let emailUsuario;
    let imagenUsuario;

    if(this.state.userDetails == '') {
      nombreUsuario = <p>No se pudo obtener el nombre del usuario</p>
      emailUsuario = <p>No se pudo obtener el email del usuario</p>;
      imagenUsuario = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ imagenDefault } alt=" DefaultImage"/>

    } else {
      let userName = this.state.userDetails[0].nombre;
      nombreUsuario = <p> { userName } </p>

      let userEmail = this.state.userDetails[0].email;
      emailUsuario = <p> { userEmail } </p>
      
      let userImg = 'http://localhost:3000/images/avatars/' + this.state.userDetails[0].avatar;
      console.log(userImg);
      imagenUsuario = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ userImg } alt=" DefaultImage"/>
    }

    return (
      <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Último usuario en BD</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            {imagenUsuario}  
          </div>
          <p> {nombreUsuario} </p>
          <p>  {emailUsuario} </p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalles...</a>
        </div>
      </div>
    </div>
    );
  }
}

export default LastUserInDb;

  