const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Party = sequelize.define(
  "party",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    partyid: { type: DataTypes.STRING(11) },
    partyname: { type: DataTypes.STRING(11) },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Party;
