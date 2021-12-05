module.exports = (sequelize, DataTypes) => {
  const Equipo = sequelize.define("Equipo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inventario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disponibilidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, 
  {
    tableName: "equipos",
    timestamps: false,
  });
    
  Equipo.associate = function(models) {  
    Equipo.hasMany(models.Prestamo, {
      as: "equipos",
      foreignKey: "id_equipo"
    });
  }

  return Equipo;
}
                    
  