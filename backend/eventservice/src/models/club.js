'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Event,{
        foreignKey:'clubId'
      });
    }
  }
  Club.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};