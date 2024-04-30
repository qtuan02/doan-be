const express = require("express");
const { Category,Brand,Image,Product,Cart,Customer,Order,OrderDetails,Staff,Role } = require("./configs/models");
const appConfig = require("./configs/env.config");
const sequelize = require("./configs/connection");
const cors = require("cors");
const limiter = require("./common/ratelimit/RateLimit");
const app = express();
const adminRoutes = require("./routes/admin/index");
const uploadImage = require("./routes/UploadRoutes")

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/v1', adminRoutes);
app.use('/v3', uploadImage);

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