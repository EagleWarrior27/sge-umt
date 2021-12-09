import React from 'react';
import axios from 'axios';
    
import PrestamoChartRow from './PrestamoChartRow';


class PrestamoChart extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      prestamoList: [],
      fecha_inicial: "",
      fecha_corte: "",
      filtro: "",
      condicion: ""
    }
  }

  fillData(data) {
    this.setState({
        prestamoList: data.data
    })
  }

  apiCall(url) {
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        this.fillData(data);    
        console.log(this.state.prestamoList)

      })
      .catch(error => console.log(error))
  }

  actualizarRegistros() {
    this.apiCall('https://scpe-umt.herokuapp.com/prestamos/read');
  }

  componentDidMount() {
    this.actualizarRegistros()
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
        <h6>Consulta avanzada</h6>
        
        <hr />
        <div class="form-row justify-content-center">
          <div>
            <div class="form-group col-md-12">
              <label>Fecha Inicial:</label>
              <input type="date" name="fecha_inicial" class="form-control"
                value={this.state.fecha_inicial}
                onChange={(value) => this.setState({fecha_inicial:value.target.value})}
              />
            </div>
            <div class="form-group col-md-12">
              <label>Fecha Corte:</label>
              <input type="date" name="fecha_corte" class="form-control"
                value={this.state.fecha_corte}
                onChange={(value) => this.setState({fecha_corte:value.target.value})}
              />
            </div>
          </div>

          <div>
            <div class="form-group col-md-12">
              <label>Filtro</label>
              <select 
				name="filtro" 
				class="form-control"
                onChange={(value)=> this.setState({filtro:value.target.value})}
			  >
				<option value="">Elige un filtro</option>
                <option value="Alumno"># Alumno</option>
                <option value="Equipo"># Equipo</option>
                <hr />
                <option value="Becario">Nombre - Becario</option>
                <option value="Procedencia">Procedencia - Alumno</option>
                <option value="Tipo">Tipo - Equipo</option>
			  </select>
            </div>

            <div class="form-group col-md-12">
              <label>Condición</label>
              <input type="text" name="condicion" class="form-control"
                value={this.state.condicion}
                onChange={(value) => this.setState({condicion:value.target.value})}
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" onClick={()=>this.search()}>Consultar</button>
        <button type="submit" class="btn btn-success" onClick={()=>window.print()}>Imprimir</button>
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

  search() {
    if (this.state.fecha_inicial === "") {
      alert("Ingrese la fecha inicial");
    } else if (this.state.fecha_corte === "") {
      alert("Ingrese la fecha de corte");
    } else {
      if(this.state.fecha_corte < this.state.fecha_inicial) {
        alert("La fecha de corte debe ser posterior a la inicial");
      } else {
        let filtro = this.state.filtro;
        if(filtro !== "") {
          if(this.state.condicion === "") {
            alert("Ingrese la condición para el filtro dado");
          } else {
            if(filtro == 'Alumno' || filtro == 'Equipo') {
              if(Number.isInteger(parseInt(this.state.condicion, 10))) {
                this.query()
              } else {
                alert('Ingrese un valor númerico entero');
              }
            } else if (filtro == 'Becario' || filtro == 'Procedencia' || filtro == 'Tipo') {
              this.query()
            } else {
              alert('Filtro inválido');
            }                          
          }    
        } else {
          let url = 'https://scpe-umt.herokuapp.com/prestamos/rango';
          
          let fechas = {
            fecha_inicial: this.state.fecha_inicial,
            fecha_corte: this.state.fecha_corte
          }
          axios.post(url, fechas)
            .then(data => {
              this.fillData(data.data)
            })
        }
      }
    }
  }

  query() {
    let url = 'https://scpe-umt.herokuapp.com/prestamos/filtro';
                
    let datos = {
      fecha_inicial: this.state.fecha_inicial,
      fecha_corte: this.state.fecha_corte,
      filtro: this.state.filtro,
      condicion: this.state.condicion
    }
    axios.post(url, datos)
      .then(data => {
        this.fillData(data.data)  
      })
  }
}

export default PrestamoChart;