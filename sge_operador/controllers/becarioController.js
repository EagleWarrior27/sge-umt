const axios = require('axios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const controller = {	
  acceso: (req, res) => {
	return res.render('becarios/becarioAcceso');
  },
  accesoProcesamiento: (req, res) => {
	const resultValidation = validationResult(req);
	  
	if (resultValidation.errors.length > 0) {
	  res.render('becarios/becarioAcceso', {
		errors: resultValidation.mapped(),
		oldData: req.body
	  })
	} else {
	  let numBecario = req.body.becario;
	  let contrasenia = req.body.contrasenia;

	  const url = "https://scpe-umt.herokuapp.com/becarios/get/" + numBecario;
	  axios.get(url)
	    .then(response => {
		  let resultado = response.data.data;

		  if(resultado != null) {
		    let verificacionContrasenia = bcryptjs.compareSync(contrasenia, resultado.password);

			if(verificacionContrasenia) {
			  req.session.userLogged = resultado;
			  res.redirect('/');
			} else {
			  res.render('becarios/becarioAcceso', {
				errors: {
				  contrasenia: {
					msg: 'Las credenciales son inválidas'
				  }
				}
			  })
			}
		  } else {
		    res.render('becarios/becarioAcceso', {
			  errors: {
				becario: {
				  msg: 'No se encuentra este becario en nuestra base de datos'
				}
			  }
			})
		  }
	    })
	    .catch(err => {
		  console.log("Error en servidor: " + err)
	    })
	}
  },
  registro: (req, res) => {
	return res.render('becarios/becarioRegistro');
  },
  registroProcesamiento: (req, res) => {
    const resultValidation = validationResult(req);
	  
	if (resultValidation.errors.length > 0) {
	  res.render('becarios/becarioRegistro', {
		errors: resultValidation.mapped(),
		oldData: req.body
	  })
	} else {
	  let idBecario = req.body.id;

	  const url = "https://scpe-umt.herokuapp.com/becarios/get/" + idBecario;
	  axios.get(url)
	  .then(result => {
		console.log(result);
	    if(result == null) {
		  res.render('becarios/becarioRegistro', {
			errors: {
			  idBecario: {
				msg: 'Este # de becario, ya está registrado'
			  }
			},
			oldData: req.body
		  });
		} else {
		  const url = "https://scpe-umt.herokuapp.com/becarios/create";
		  let becario = {
			id: req.body.id,
			nombre: req.body.nombre,
			password: bcryptjs.hashSync(req.body.contrasenia, 10),
			imagen: req.file.filename
		  }
		  axios.post(url, becario)
		  .then(response => {
			if (response) {
			  res.redirect('acceso');
			} 
		  })
		}
	  })
	  .catch(err => {
		console.log("Error de servidor:" + err)
	  })
	}
  },
  perfil: (req, res) => {
	return res.render('becarios/becarioPerfil', {
	  becario: req.session.userLogged
	});
  },
  salida: (req, res) => {
	req.session.destroy();
	return res.redirect('/');
  }
}

module.exports = controller;