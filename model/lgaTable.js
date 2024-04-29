const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const State = require("./stateTable");

const LGA = sequelize.define(
  "lga",
  {
    uniqueid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lga_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    lga_name: { type: DataTypes.STRING(50) },
    state_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: "state",
        key: "state_id",
      },
    },
    lga_description: { type: DataTypes.STRING(150) },
    entered_by_user: { type: DataTypes.STRING(150) },
    date_entered: { type: DataTypes.DATE },
    user_ip_address: { type: DataTypes.STRING(100) },
  },
  { freezeTableName: true, timestamps: false }
);

// ActivityHistory.sync({ alter: true });
LGA.belongsTo(State, { foreignKey: "state_id" });

module.exports = LGA;
