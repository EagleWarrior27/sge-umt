const db = require('../database/models');

const controller = {
  create: async(req, res) => {
    //INSERT INTO becarios VALUES(Nombre, Password, Imagen);
    await db.Becario.create({
      id: req.body.id,
      nombre: req.body.nombre,
      password: req.body.password,
      imagen: req.body.imagen
    })
    .then(resultado => {
      return res.status(200).json({
        data: resultado
      })
    })
    .catch(error =>{
      return res.status(500).json({
        data: error
      })
    })
  },
  read: async(req, res) => {
    //SELECT * FROM becarios;
    await db.Becario.findAll()
      .then(resultado => {
        return res.status(200).json({
          data: resultado
        })
      })
      .catch(error => {
        return res.status(500).json({
          data: error
        })
      })
  },
  update: async(req, res) => {
    let idBecario = req.params.id;

    //UPDATE becarios SET nombre = Nombre, password = Password, imagen = Imagen WHERE id = Id;
    await db.Becario.update({
      nombre: req.body.nombre,
      password: req.body.password
    },
    {
      where: { id: idBecario }
    })
    .then(resultado => {
      return res.status(200).json({
        data: resultado
      })
    })
    .catch(error => {
      return res.status(500).json({
        data: error
      })
    })
  },
  delete: async(req, res) => {
    let idBecario = req.params.id;
  
    //DELETE FROM becarios WHERE id = Id;
    await db.Becario.destroy({
      where: { id: idBecario }
    })
      .then(resultado => {
        return res.status(200).json({
          data: resultado
        })
      })
      .catch(error => {
        return res.status(500).json({
          data: error 
        })
      })
  },
  get: async(req, res) => {
    let idBecario = req.params.id;
  
    //SELECT * FROM becarios WHERE id = idBecario;
    await db.Becario.findByPk(idBecario)
      .then(resultado => {
        return res.status(200).json({
          data: resultado
        })
      })
      .catch(error => {
        return res.status(500).json({
          data: error 
        })
      })
  },
  last: async(req, res) => {
    await db.Becario.findAll({
      order: [
        ['id', 'DESC'],
      ],
      limit: 1
    })
    .then(data => {
      return res.status(200).json({
        data: data,
      })
    })
    .catch(error => {
      return res.status(500).json({
        data: error 
      })
    })
  }
}
  
module.exports = controller;


