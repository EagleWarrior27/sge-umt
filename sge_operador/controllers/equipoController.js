const axios = require('axios');
const { validationResult } = require('express-validator');

const controller = {
  categoria: (req, res) => {
    let tipo = req.params.tipo;
      
    const url = "https://scpe-umt.herokuapp.com/equipos/categoria/" + tipo;
    axios.get(url)
    .then(result => {
      if(result.data.success) {
        const data = result.data.data
        res.render('equipos/equipoCategoria', { equipos: data })
      } else {
        console.log("Error de consulta")
      }
    })
    .catch(err => {
      console.log("Error de servidor:" + err)
    })
  },
  detalles: (req, res) => {
	let id = req.params.id;

	const url = "https://scpe-umt.herokuapp.com/equipos/get/" + id;
	axios.get(url)
	  .then(result => {
	    if(result != null) {
		  res.render('equipos/equipoDetalles', { equipo: result.data.data });
		} 
	  }) 
  },
  registro: (req, res) => {
    return res.render('equipos/equipoRegistro');
  },
  registroProcesamiento: (req, res) => {
    const resultValidation = validationResult(req);
	  
	if (resultValidation.errors.length > 0) {
	  res.render('equipos/equipoRegistro', {
		errors: resultValidation.mapped(),
		oldData: req.body
	  })
	} else {
      let idEquipo = req.body.numSerie;

	  const url = "https://scpe-umt.herokuapp.com/equipos/get/" + idEquipo;
	  axios.get(url)
	    .then(response => {
		  let resultado = response.data.data;
		  
		  console.log(resultado);
	      if(resultado != null) {
		    res.render('equipos/equipoRegistro', {
			  errors: {
			    numSerie: {
				  msg: 'Este número de serie ya ha sido registrado'
			    }
			  },
			  oldData: req.body
		    });
		  } else {
		    const url = "https://scpe-umt.herokuapp.com/equipos/create";
			let equipo = {
			  id: req.body.numSerie,
			  tipo: req.body.tipo,
			  marca: req.body.marca,
              modelo: req.body.modelo,
              inventario: req.body.numInventario,
              imagen: req.file.filename
		    }
		  
            axios.post(url, equipo)
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