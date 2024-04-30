require('dotenv').config();

const appConfig = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DIALECT: process.env.DIALECT,
    DB_NAME: process.env.DB_NAME,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET
}

module.exports = appConfig;