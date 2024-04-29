const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LgaResult = sequelize.define(
  "announced_lga_results",
  {
    result_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lga_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    party_abbreviation: { type: DataTypes.CHAR(4) },
    party_score: { type: DataTypes.INTEGER },
    entered_by_user: { type: DataTypes.STRING(50) },
    date_entered: { type: DataTypes.DATE },
    user_ip_address: { type: DataTypes.STRING(50) },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = LgaResult;
