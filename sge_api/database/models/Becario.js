module.exports = (sequelize, DataTypes) => {
  const Becario = sequelize.define("Becario", {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, 
  {
    tableName: "becarios",
    timestamps: false,
  });
    
  Becario.associate = function(models) {  
    Becario.hasMany(models.Prestamo, {
      as: "becarios",
      foreignKey: "id_becario"
    });
  }
  
  return Becario;
}
                    
  
       