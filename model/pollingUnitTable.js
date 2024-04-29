const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PollingUnit = sequelize.define(
  "polling_unit",
  {
    uniqueid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    polling_unit_id: { type: DataTypes.INTEGER, primaryKey: true },
    ward_id: { type: DataTypes.STRING(50) },
    lga_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "lga",
        key: "lga_id",
      },
    },
    uniquewardid: { type: DataTypes.INTEGER },
    polling_unit_number: { type: DataTypes.STRING(50) },
    polling_unit_name: { type: DataTypes.STRING(50) },
    polling_unit_description: { type: DataTypes.TEXT },
    lat: { type: DataTypes.STRING(255) },
    long: { type: DataTypes.STRING(255) },
    entered_by_user: { type: DataTypes.STRING(50) },
    date_entered: { type: DataTypes.DATE },
    user_ip_address: { type: DataTypes.STRING(50) },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = PollingUnit;
