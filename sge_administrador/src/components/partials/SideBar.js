import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import AlumnoChart from '../alumnos/AlumnoChart';
import AlumnoRegistro from '../alumnos/AlumnoRegistro';
import AlumnoEdicion from '../alumnos/AlumnoEdicion'; 
import AlumnoEliminacion from '../alumnos/AlumnoEliminacion';
import LastAlumnoInDB from '../alumnos/LastAlumnoInBD'; 
import BecarioChart from '../becarios/BecarioChart';
import BecarioRegistro from '../becarios/BecarioRegistro';
import BecarioEdicion from '../becarios/BecarioEdicion';
import BecarioEliminacion from '../becarios/BecarioEliminacion';
import LastBecarioInBD from '../becarios/LastBecarioInBD';
import EquipoChart from '../equipos/EquipoChart';
import EquipoEliminacion from '../equipos/EquipoEliminacion';
import LastEquipoInBD from '../equipos/LastEquipoInBD';
import PrestamoChart from '../prestamos/PrestamoChart';
import PrestamoFiltro from '../prestamos/PrestamoFiltro';
import LastPrestamoInBD from '../prestamos/LastPrestamoInBD';

import ContentWrapper from '../ContentWrapper';
import NotFound from '../NotFound';

function SideBar(){
  return(
    <React.Fragment>

    {/*<!-- Sidebar -->*/}
    <ul className="navbar-nav navbar-color sidebar sidebar-dark accordion" id="accordionSidebar">
    
      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider my-0"/>

      {/*<!-- Nav Item - Dashboard -->*/}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard - SGE UMT</span></Link>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider"/>

      <li className="dropdown-item">
        <Dropdown>
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            <Link className="dropdown-link" to="/AlumnoChart">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Alumnos</span>
            </Link>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link className="dropdown-link" to="/AlumnoRegistro">Agregar alumno</Link></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><Link className="dropdown-link" to="/LastAlumnoInDB">Último alumno</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <li>
        <Dropdown className="dropdown-item">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            <Link className="dropdown-link" to="/BecarioChart">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Becarios</span>
            </Link>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link className="dropdown-link" to="/BecarioRegistro">Agregar becario</Link></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><Link className="dropdown-link" to="/LastBecarioInDB">Último becario</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <li>
        <Dropdown className="dropdown-item">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            <Link className="dropdown-link" to="/EquipoChart">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Equipos</span>
            </Link>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link className="dropdown-link" to="/LastEquipoInBD">Último equipo</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      
      <li>
        <Dropdown className="dropdown-item">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            <Link className="dropdown-link" to="/PrestamoChart">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Préstamos</span>
            </Link>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link className="dropdown-link" to="/PrestamoFiltro">Consulta avanzada</Link></Dropdown.Item>
            <Dropdown.Item><Link className="dropdown-link" to="/LastPrestamoInBD">Último préstamo</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </ul>

    <Switch>
      <Route exact path="/">
        <ContentWrapper />
      </Route>
                
      <Route path="/AlumnoChart">
        <AlumnoChart />
      </Route>

      <Route path="/AlumnoRegistro">
        <AlumnoRegistro />
      </Route>
      
      <Route path="/AlumnoEdicion/:id"
        component={ AlumnoEdicion }
      />

      <Route path="/AlumnoEliminacion/:id"
        component={ AlumnoEliminacion }
      />

      <Route path="/LastAlumnoInDB">
        <LastAlumnoInDB />
      </Route>

      <Route path="/BecarioChart">
        <BecarioChart />
      </Route>
      
      <Route path="/BecarioRegistro">
        <BecarioRegistro />
      </Route>
      
      <Route path="/BecarioEdicion/:id"
        component={ BecarioEdicion }
      />
      
      <Route path="/BecarioEliminacion/:id"
        component={ BecarioEliminacion }
      />
      
      <Route path="/LastBecarioInDB">
        <LastBecarioInBD />
      </Route>

      <Route path="/EquipoChart"
        component={ EquipoChart }
      />

      <Route path="/EquipoEliminacion/:id"
        component={ EquipoEliminacion }
      />
      
      <Route path="/EquipoEliminacion/:id"
        component={ EquipoEliminacion }
      />
      
      <Route path="/LastEquipoInBD">
        <LastEquipoInBD />
      </Route>
               
      <Route path="/PrestamoChart">
        <PrestamoChart />
      </Route>

      <Route path="/PrestamoFiltro">
        <PrestamoFiltro />
      </Route>

      <Route path="/LastPrestamoInBD">
        <LastPrestamoInBD />
      </Route>

      <Route component={ NotFound } />
    </Switch>
    
    </React.Fragment>
  )
}

export default SideBar;