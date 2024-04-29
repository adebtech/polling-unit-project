const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const State = sequelize.define(
  "states",
  {
    state_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    state_name: {
      type: DataTypes.STRING(150),
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = State;
