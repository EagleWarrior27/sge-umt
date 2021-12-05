module.exports = (sequelize, DataTypes) => {
  const Prestamo = sequelize.define("Prestamo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fecha_p: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora_p: {
      type: DataTypes.TIME,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_d: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora_d: {
      type: DataTypes.TIME,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_becario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_equipo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, 
  {
    tableName: "prestamos",
    timestamps: false,
  });

  Prestamo.associate = function(models) {  
    Prestamo.belongsTo(models.Becario, {
      as: "becarios",
      foreignKey: "id_becario"
    })

    Prestamo.belongsTo(models.Alumno, {
      as: 'alumnos',
      foreignKey: 'id_alumno'
    });

    Prestamo.belongsTo(models.Equipo, {
      as: 'equipos',
      foreignKey: 'id_equipo'
    });
  }

  return Prestamo;
}
                    
  