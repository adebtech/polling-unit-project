const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Ward = sequelize.define(
  "ward",
  {
    uniqueid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ward_id: { type: DataTypes.INTEGER },
    ward_name: { type: DataTypes.STRING(50) },
    lga_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "lga",
        key: "lga_id",
      },
    },
    ward_description: { type: DataTypes.TEXT },
    entered_by_user: { type: DataTypes.STRING(50) },
    date_entered: { type: DataTypes.DATE },
    user_ip_address: { type: DataTypes.STRING(50) },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Ward;
