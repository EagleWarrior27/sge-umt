const axios = require('axios');
const { validationResult } = require('express-validator');

const controller = {	
  registro: (req, res) => {
	return res.render('alumnos/alumnoRegistro');
  },
  registroProcesamiento: (req, res) => {
	const resultValidation = validationResult(req);
	  
	if (resultValidation.errors.length > 0) {
	  res.render('alumnos/alumnoRegistro', {
		errors: resultValidation.mapped(),
		oldData: req.body
	  })
	} else {
	  let idAlumno = req.body.matricula;

	  const url = "https://scpe-umt.herokuapp.com/alumnos/get/" + idAlumno;
	  axios.get(url)
	    .then(response => {
		  let resultado = response.data.data;
	    
		  if(resultado != null) {
		    res.render('alumnos/alumnoRegistro', {
			  errors: {
			    matricula: {
				  msg: 'Esta matrícula ya ha sido registrada'
			    }
			  },
			  oldData: req.body
		    });
		  } else {
		    const url = "https://scpe-umt.herokuapp.com/alumnos/create";
		    let alumno = {
			  id: req.body.matricula,
			  nombre: req.body.nombre,
			  procedencia: req.body.procedencia,
		    }
		    
			axios.post(url, alumno)
		      .then(response => {
			    if (response) {
			      res.redirect('/becarios/perfil');
			    } 
		      })
		  }
	    })
	    .catch(err => {
		  console.log("Error de servidor:" + err)
	    })
	}
  }
}

module.exports = controller;