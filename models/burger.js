module.exports = function(sequelize, DataTypes){
  var Burger = sequelize.define("Burger",{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    } ,
    ready: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
   });

  return Burger;
};