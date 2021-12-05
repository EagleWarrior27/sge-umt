const { request } = require('express');
const db = require('../database/models');
const { last } = require('./equiposController');
const op = db.Sequelize.Op; 

const controller = {
  create: async(req, res) => {
    //INSERT INTO prestamos VALUES(FechaP, HoraP, Tipo, FechaD, HoraD, Id_Becario, Id_Alumno, Id_Equipo);
    const data = await db.Prestamo.create({
      fecha_p: req.body.fecha_p,
      hora_p: req.body.hora_p,
      tipo: req.body.tipo,
      fecha_d: req.body.fecha_d,
      hora_d: req.body.hora_d,
      estado: 'Activo',
      id_becario: req.body.id_becario,
      id_alumno: req.body.id_alumno,
      id_equipo: req.body.id_equipo
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
    //SELECT * FROM prestamos WHERE estado = 'Activo';
    
    const data = await db.Prestamo.findAll({
      attributes: ['fecha_p', 'tipo', 'fecha_d', 'estado'],
      include: [
        { 
          model: db.Becario, 
          as: "becarios",
          attributes: ['nombre']
        },
        { 
          model: db.Alumno, 
          as: "alumnos",
          attributes: ['nombre', 'procedencia']
        },
        {
          model: db.Equipo, 
          as: "equipos",
          attributes: ['id', 'tipo']
        }
      ],
      limit: 20
    })
    .then(function(data) {
      return data;
    })
    .catch(err => {
      return err;
    }) 
  
    res.json({
      success: true,
      data: data
    })
  },
  update: async(req, res) => {
    let id = req.params.id;
    
    //UPDATE prestamos SET nombre = Nombre, procedencia = Procedencia WHERE id = Id;
    const data = await db.Prestamo.update({
      tipo: req.body.tipo,
      fecha_d: req.body.fecha_d,
      hora_d: req.body.hora_d,
      id_becario: req.body.id_becario
    },
    {
      where: { id: id }
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
    const id = req.params.id;
  
    //DELETE FROM prestamos WHERE id = Id;
    const del = await db.Prestamo.destroy({
      where: { id: id }
    })
  
    res.json({
      success: true,
      deleted: del,    
    });
  },
  get: async(req, res) => {
    let id = req.params.id;
    //SELECT * FROM prestamos WHERE id = Id;
    const data = await db.Prestamo.findOne({
      where: { id: id },
      include: [
        { association: "becarios" },
        { association: "alumnos" },
        { association: "equipos" }
      ],
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
    let idPrestamo = req.params.id;
    
    //UPDATE prestamos SET estado='Devuelto' WHERE id = idPrestamo;
    let data = await db.Prestamo.update({
      fecha_d: req.body.fecha_d,
      hora_d: req.body.hora_d,
      estado: 'Devuelto',
    },
    {
      where: { id: idPrestamo}
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })

    res.json({
      data: data
    });
  },
  activo: async(req, res) => {
    //SELECT * FROM prestamos WHERE estado = 'Activo';
    const data = await db.Prestamo.findAll({
      where: {
        estado: 'Activo'
      },
      include: [
        { association: "becarios" },
        { association: "alumnos" },
        { association: "equipos" }
      ],
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
  devuelto: async(req, res) => { 
    //SELECT * FROM prestamos WHERE estado = 'Activo';
    const data = await db.Prestamo.findAll({
      where: {
        estado: 'Devuelto'
      },
      include: [
        { 
          model: db.Becario, 
          as: "becarios",
          attributes: ['nombre']
        },
        { 
          model: db.Alumno, 
          as: "alumnos",
          attributes: ['nombre', 'procedencia']
        },
        {
          model: db.Equipo, 
          as: "equipos",
          attributes: ['id', 'tipo']
        }
      ],
    })
    .then(data => {
      return res.status(200).json({
        data: data,
      })
    })
    .catch(error => {
      return res.status(200).json({
        data: error,
      })
    })
  },
  rango: async(req, res) => {
    let fecha_inicial = req.body.fecha_inicial;
    let fecha_corte = req.body.fecha_corte;

    //SELECT * FROM prestamos WHERE id = Id;
    await db.Prestamo.findAll({
      where: {
        fecha_p: {
          [op.between]: [fecha_inicial , fecha_corte]
        }
      },
      include: [
        { 
          model: db.Becario, 
          as: "becarios",
          attributes: ['nombre']
        },
        { 
          model: db.Alumno, 
          as: "alumnos",
          attributes: ['nombre', 'procedencia']
        },
        {
          model: db.Equipo, 
          as: "equipos",
          attributes: ['id', 'tipo']
        }
      ],
    })
    .then(data => {
      return res.status(200).json({
        data: data,
      })
    })
    .catch(error => {
      return res.status(500).json({
        data: error,
      })
    })
  },
  filtro: async(req, res) => {
    let fecha_inicial = req.body.fecha_inicial;
    let fecha_corte = req.body.fecha_corte;
    let filtro = req.body.filtro;
    let condicion = req.body.condicion;

    switch(filtro) {
      case 'Alumno':
        await db.Prestamo.findAll({
          attributes: ['fecha_p', 'tipo', 'fecha_d', 'estado'],
          where: {
            [op.and]: [ 
              { 
                fecha_p: { [op.between]: [fecha_inicial , fecha_corte] }
              }, 
              { id_alumno: condicion }
            ]
          }, 
          include: [
            { 
              model: db.Becario, 
              as: "becarios",
              attributes: ['nombre']
            },
            { 
              model: db.Alumno, 
              as: "alumnos",
              attributes: ['nombre', 'procedencia']
            },
            {
              model: db.Equipo, 
              as: "equipos",
              attributes: ['id', 'tipo']
            }
          ],
        })
        .then(data => {
          return res.status(200).json({
            data: data,
          })
        })
        
        break;
      case 'Equipo':
        await db.Prestamo.findAll({
          attributes: ['fecha_p', 'tipo', 'fecha_d', 'estado'],
          where: {
            [op.and]: [ 
              { 
                fecha_p: { [op.between]: [fecha_inicial , fecha_corte] }
              }, 
              { id_equipo: condicion }
            ]
          }, 
          include: [
            { 
              model: db.Becario, 
              as: "becarios",
              attributes: ['nombre']
            },
            { 
              model: db.Alumno, 
              as: "alumnos",
              attributes: ['nombre', 'procedencia']
            },
            {
              model: db.Equipo, 
              as: "equipos",
              attributes: ['id', 'tipo']
            }
          ],
        })
        .then(data => {
          return res.status(200).json({
            data: data,
          })
        })
        
        break;
      case 'Becario':
        await db.Prestamo.findAll({
          attributes: ['fecha_p', 'tipo', 'fecha_d', 'estado'],
          where: {
            fecha_p: {
              [op.between]: [fecha_inicial , fecha_corte]
            }
          }, 
          include: [
            { 
              model: db.Becario, 
              as: "becarios",
              attributes: ['nombre'],
              where: {nombre: condicion}
            },
            { 
              model: db.Alumno, 
              as: "alumnos",
              attributes: ['nombre', 'procedencia']
            },
            {
              model: db.Equipo, 
              as: "equipos",
              attributes: ['id', 'tipo']
            }
          ],
        })
        .then(data => {
          return res.status(200).json({
            data: data,
          })
        })
        
        break;
      case 'Procedencia':
        await db.Prestamo.findAll({
          attributes: ['fecha_p', 'tipo', 'fecha_d', 'estado'],
          where: {
            fecha_p: {
              [op.between]: [fecha_inicial , fecha_corte]
            }
          },
          include: [
            { 
              model: db.Becario, 
              as: "becarios",
              attributes: ['nombre']
            },
            { 
              model: db.Alumno, 
              as: "alumnos",
              attributes: ['nombre', 'procedencia'],
              where: {procedencia: condicion}
            },
            {
              model: db.Equipo, 
              as: "equipos",
              attributes: ['id', 'tipo']
            }
          ],
        })
        .then(data => {
          return res.status(200).json({
            data: data,
          })
        })

        break;
      case 'Tipo':
        await db.Prestamo.findAll({
          attributes: ['fecha_p', 'tipo', 'fecha_d', 'estado'],
          where: {
            fecha_p: {
              [op.between]: [fecha_inicial , fecha_corte]
            }
          },
          include: [
            { 
              model: db.Becario, 
              as: "becarios",
              attributes: ['nombre']
            },
            { 
              model: db.Alumno, 
              as: "alumnos",
              attributes: ['nombre', 'procedencia']
            },
            {
              model: db.Equipo, 
              as: "equipos",
              attributes: ['id', 'tipo'],
              where: {tipo: condicion}
            }
          ],
        })
        .then(data => {
          return res.status(200).json({
            data: data,
          })
        })

        break;
  
      default: console.log('Sin Filtro')
    }
  },
  last: async(req, res) => {
    await db.Prestamo.findAll({
      order: [
        ['id', 'DESC'],
      ],
      limit: 1,
      include: [
        { 
          model: db.Becario, 
          as: "becarios",
          attributes: ['nombre']
        },
        { 
          model: db.Alumno, 
          as: "alumnos",
          attributes: ['nombre', 'procedencia']
        },
        {
          model: db.Equipo, 
          as: "equipos",
          attributes: ['id', 'tipo']
        }
      ],
    })
    .then(data => {
      return res.status(200).json({
        data: data,
      })
    })
  }
}
  
module.exports = controller;