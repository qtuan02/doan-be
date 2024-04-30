const Sequelize = require("sequelize");
const appConfig = require('./env.config');

const sequelize = new Sequelize(
    appConfig.DB_NAME,
    appConfig.USER,
    appConfig.PASSWORD,
    {
        host: appConfig.HOST,
        dialect: appConfig.DIALECT,
        logging: false
    }
);

module.exports = sequelize;