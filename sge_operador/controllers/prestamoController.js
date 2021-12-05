const axios = require('axios');
const { validationResult } = require('express-validator');

const controller = {	
  lista: (req, res) => {
	let url = "https://scpe-umt.herokuapp.com/prestamos/activo";
	
	axios.get(url)
	  .then(response => {
		let resultado = response.data.data;
	
		if(resultado != null) {
		  res.render('prestamos/prestamoControl', { prestamos: resultado })
		} else {
		  console.log("Error de consulta")
		}
	  })
	  .catch(err => {
		console.log("Error de servidor:" + err)
	  })
  },
  registro: (req, res) => {
	let id = req.params.id;
	return res.render('prestamos/prestamoRegistro', { idEquipo: id });
  },
  registroProcesamiento: (req, res) => {
	const resultValidation = validationResult(req);

	let idEquipo = req.params.equipo;
	if (resultValidation.errors.length > 0) {
	  
	  res.render('prestamos/prestamoRegistro', {
		idEquipo: idEquipo,
		errors: resultValidation.mapped(),
		oldData: req.body
	  })
	} else {
	  let idAlumno = req.body.matricula;

	  let urlAlumno = "https://scpe-umt.herokuapp.com/alumnos/get/" + idAlumno;
	  axios.get(urlAlumno)
	    .then(response => {
		  let resultado = response.data.data;

	      if(resultado == null) {
		    res.render('prestamos/prestamoRegistro', {
			  idEquipo: idEquipo,
			  errors: {
			    matricula: {
				  msg: 'Este # de alumno, no está registrado'
			    }
			  },
			  oldData: req.body
		    });
		} else {
		  let idBecario = req.params.becario;
		  const fecha = new Date();
          let fechaPrestamo = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
		  let horaPrestamo = fecha.getHours() + ":" + fecha.getMinutes();
		  
		  let prestamo = {
			fecha_p: fechaPrestamo,
		    hora_p: horaPrestamo,
			tipo: req.body.tipo,
			fecha_d: req.body.fecha,
			hora_d: req.body.hora,
			id_becario: idBecario,
			id_alumno: req.body.matricula,
			id_equipo: idEquipo
		  }

		  const urlPrestamo = "https://scpe-umt.herokuapp.com/prestamos/create";
		    axios.post(urlPrestamo, prestamo)
		    .then(response => {
			  if (response) {
			    const urlEquipo = "https://scpe-umt.herokuapp.com/equipos/prestamo";
			    
				axios.post(urlEquipo, { id: idEquipo })
			      .then(response => {
				    if (response) {
				    } 
			      })
				  
				res.redirect('/');
			  } 
		    })
		}
	  })
	  .catch(err => {
		console.log("Error de servidor:" + err)
	  })
	}
  },
  edicion: (req, res) => {
    let idPrestamo = req.params.id;

	let url = "https://scpe-umt.herokuapp.com/prestamos/get/" + idPrestamo;
	axios.get(url)
      .then(response => {
	    let resultado = response.data.data;
		
		console.log(resultado);
        if(resultado != null) {
			return res.render('prestamos/prestamoEdicion', { oldData: resultado })
        } else {
          console.log("Error de consulta")
        }
      })
      .catch(err => {
        console.log("Error de servidor:" + err)
	  })
  },
  edicionProcedimiento: (req, res) => {
	let idPrestamo = req.params.id;
    let idBecario = req.params.becario;

	let actualizacionPrestamo = {
	  tipo: req.body.tipo,
	  fecha_d: req.body.fecha_d,
	  hora_d: req.body.hora_d,
	  id_becario: idBecario,
	}
	
	let url = "https://scpe-umt.herokuapp.com/prestamos/update/" + idPrestamo;
	axios.put(url, actualizacionPrestamo)
	  .then(response => {
		res.redirect('/prestamos/lista');
	  })
  },
  eliminacion: (req, res) => {
	let idPrestamo = req.params.id;
	let idEquipo = req.params.equipo;

	let urlPrestamo = "https://scpe-umt.herokuapp.com/prestamos/delete/" + idPrestamo;
	axios.delete(urlPrestamo)
	  .then(response => {
		let urlEquipo = "https://scpe-umt.herokuapp.com/equipos/devolucion/" + idEquipo;
		  axios.put(urlEquipo)
		    .then(response => {
			  res.redirect('/prestamos/lista');
		    })
	  })
  },
  devolucion: (req, res) => {
	let id = req.params.id;

	const url = "https://scpe-umt.herokuapp.com/prestamos/get/" + id;
	axios.get(url)
      .then(response => {
	    let resultado = response.data.data;
		
        if(resultado != null) {
			return res.render('prestamos/prestamoDevolucion', { prestamo: resultado })
        } else {
          console.log("Error de consulta")
        }
      })
      .catch(err => {
        console.log("Error de servidor:" + err)
	  })
  },
  devolucionProcesamiento: (req, res) => {
	let idPrestamo = req.params.id;
	let idEquipo = req.params.equipo;
	
	let urlPrestamo = "https://scpe-umt.herokuapp.com/prestamos/devolucion/" + idPrestamo;
	
	let fecha = new Date();
    let fechaDevolucion = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
	let horaDevolucion = fecha.getHours() + ":" + fecha.getMinutes();
	let datosDevolucion = {
	  fecha_d: fechaDevolucion,
	  hora_d: horaDevolucion
	}

	axios.put(urlPrestamo, datosDevolucion)
	  .then(response => {
		let urlEquipo = "https://scpe-umt.herokuapp.com/equipos/devolucion/" + idEquipo;
		axios.put(urlEquipo)
		  .then(response => {
			res.redirect('/prestamos/lista');
		  })
	  })
  },
}

module.exports = controller;