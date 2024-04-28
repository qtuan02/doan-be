const express = require("express");
const { Category,Brand,Image,Product,Cart,Customer,Order,OrderDetails,Staff,Role } = require("./config/models");
const appConfig = require("./config/env.config");
const sequelize = require("./config/connection");
const cors = require("cors");
const limiter = require("./common/ratelimit/RateLimit");
const app = express();
const adminRoutes = require("./routes/admin/index");

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/v1', adminRoutes);

app.listen(appConfig.PORT, () => {
  console.log(`Running port ${appConfig.PORT}.`);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected successfully.");
    })
    .catch((error) => {
      console.error("Failed to connect", error);
    });
  sequelize
    .sync()
    .then(() => {
      console.log("Created all table successfully.");
    })
    .catch((error) => {
      console.error("Failed to create table", error);
    });
});
