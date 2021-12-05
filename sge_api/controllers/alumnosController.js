const db = require('../database/models');

const controller = {
  create: async(req, res) => {
    //INSERT INTO alumnos VALUES(id, nombre, procedencia);
    await db.Alumno.create({
      id: req.body.id,
      nombre: req.body.nombre,
      procedencia: req.body.procedencia
    })
    .then(data => {
      return res.status(200).json({
        data: data
      })
    })
    .catch(error =>{
      return res.status(500).json({
        data: error
      })
    })
  },
  read: async(req, res) => {
    //SELECT * FROM alumnos;
    await db.Alumno.findAll()
    .then(data => {
      return res.status(200).json({
        data: data
      })
    })
    .catch(error => {
      return res.status(500).json({
        data: error
      })
    }) 
  },
  update: async(req, res) => {
    let idAlumno = req.params.id;
    
    //UPDATE alumnos SET nombre = nombre, procedencia = procedencia WHERE id = idAlumno;
    await db.Alumno.update({
      nombre: req.body.nombre,
      procedencia: req.body.procedencia,
    },
    {
      where: { id: idAlumno }
    })
    .then(data => {
      return res.status(200).json({
        data: data
      })
    })
    .catch(error => {
      return res.status(500).json({
        data: error
      })
    })
  },
  delete: async(req, res) => {
    let idAlumno = req.params.id;
  
    //DELETE FROM alumnos WHERE id = idAlumno;
    await db.Alumno.destroy({
      where: { id: idAlumno }
    })
    .then(data => {
      return res.status(200).json({
        data: data
      })
    })
    .catch(error => {
      return res.status(500).json({
        data: error
      })
    })
  },
  get: async(req, res) => {
    let idAlumno = req.params.id;
  
    //SELECT * FROM alumnos WHERE id = idAlumno;
    await db.Alumno.findByPk(idAlumno)
    .then(data => {
      return res.status(200).json({
        data: data
      })
    })
    .catch(error =>{
      return res.status(500).json({
        data: error
      })
    })
  },
  last: async(req, res) => {
    await db.Alumno.findAll({
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
