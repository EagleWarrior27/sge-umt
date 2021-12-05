module.exports = (sequelize, DataTypes) => {
  const Alumno = sequelize.define("Alumno", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    procedencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, 
  {
    tableName: "alumnos",
    timestamps: false,
  });

  Alumno.associate = function(models) {  
    Alumno.hasMany(models.Prestamo, {
      as: "alumnos",
      foreignKey: "id_alumno"
    });
  }
    
  return Alumno;
}
                    
  