const { Sequelize } = require("sequelize");

// This setting is meant to make a fix to some date related issues specific to MSSQL server
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    logging: false,
  }
);

// const sequelize = new Sequelize(
//   "mysql://sql6.freesqldatabase.com:3306/sql6702554?user=sql6702554&password=cPiMHBMPpv"
// );

sequelize
  .authenticate()
  .then(() => {
    console.log(`CONNECTION TO [${process.env.DATABASE}] SUCCESSFUL!`);
  })
  .catch((err) => {
    console.log(err);
    console.log("SOMETHING WENT WRONG WITH THE CONNECTION: ", err.message);
  });

module.exports = sequelize;
