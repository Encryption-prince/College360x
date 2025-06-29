'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Venue,{
        foreignKey:'venueId',
        onDelete:'CASCADE'
      })

      this.belongsTo(models.Club,{
        foreignKey:'clubId',
        onDelete:'CASCADE'
      })

      this.belongsTo(models.College,{
        foreignKey:'collegeId',
        onDelete:'CASCADE'
      })
    }
  }
  Event.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    venueId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    startingTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    endingTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    clubId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    collegeId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    total_seats: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:100
    },
    registration_count: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    permission: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};