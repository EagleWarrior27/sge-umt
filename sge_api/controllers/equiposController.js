const db = require('../database/models');
const op = db.Sequelize.Op;

const controller = {
  create: async(req, res) => {
    //INSERT INTO equipos VALUES(NumSerie, Tipo, Marca, Modelo, NumInventario, Imagen);
    const data = await db.Equipo.create({
      id: req.body.id,
      tipo: req.body.tipo,
      marca: req.body.marca,
      modelo: req.body.modelo,
      inventario: req.body.inventario,
      disponibilidad: 'Disponible',
      imagen: req.body.imagen
    })
    .then(function(data){
      return data;
    })
    .catch(err =>{
      return err;
    })

    res.status(200).json({
      success: true,
      data: data
    });
  },
  read: async(req, res) => {
    //SELECT * FROM equipos;
    const data = await db.Equipo.findAll()
    .then(function(data){
      return data;
    })
    .catch(err => {
      return err;
    })
  
    res.json({
      success: true,
      data: data
    }); 
  },
  update: async(req, res) => {
    const { NumSerie } = req.params;
    const { Tipo, Marca, Modelo, NumInventario, Imagen } = req.body;
  
    //UPDATE equipos SET WHERE id = NumSerie;
    const data = await db.Equipo.update({
      tipo: Tipo,
      marca: Marca,
      modelo: Modelo,
      inventario: NumInventario,
      imagen: Imagen
    },
    {
      where: { id: NumSerie }
    })
    .then( function(data){
      return data;
    })
    .catch(error => {
      return error;
    })
  
    res.json({
      success: true,
      data: data,
    });
  },
  delete: async(req, res) => {
    let idEquipo = req.params.id;
  
    //DELETE FROM equipos WHERE id = Matricula;
    await db.Equipo.destroy({
      where: { id: idEquipo }
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
    let NumSerie = req.params.id;
  
    //SELECT * FROM equipos WHERE id = NumSerie;
    const data = await db.Equipo.findByPk(NumSerie)
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      success: true,
      data: data
    });
  },
  tipo: async(req, res) => {
    const Tipo = req.params.tipo;
    
    //SELECT * FROM equipos WHERE tipo = Tipo;
    const data = await db.Equipo.findAll({
      where: {
        [op.and]: [ { tipo: Tipo }, { disponibilidad: 'Disponible' }]
      }, 
      limit: 8
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      success: true,
      data: data
    });
  },
  disponible: async(req, res) => {
    //SELECT * FROM equipos WHERE disponibilidad = 'Disponible';
    const data = await db.Equipo.findAll({
      where: { disponibilidad: 'Disponible' }
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      success: true,
      data: data
    });
  },
  prestado: async(req, res) => {
    //SELECT * FROM equipos WHERE disponibilidad = 'En Préstamo';
    const data = await db.Equipo.findAll({
      where: { disponibilidad: 'En préstamo' }
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      success: true,
      data: data
    });
  },
  prestamo: async(req, res) => {
    console.log(req.body.id);
    //UPDATE  FROM equipos WHERE id = NumSerie;
    const data = await db.Equipo.update({
      disponibilidad: 'En préstamo',
    },
    {
      where: { id: req.body.id}
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      success: true,
      data: data
    });
  },
  devolucion: async(req, res) => {
    //UPDATE  FROM equipos WHERE id = NumSerie;
    let id = req.params.id;
  
    const data = await db.Equipo.update({
      disponibilidad: 'Disponible',
    },
    {
      where: { id: id}
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      success: true,
      data: data
    });
  },
  last: async(req, res) => {
    await db.Equipo.findAll({
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
  }
}
  
module.exports = controller;
