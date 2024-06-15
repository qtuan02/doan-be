const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const pusher = require("./configs/pusher");
const { Banner, Category, Brand, Product, Cart, User, Order, OrderDetail, Favorite } = require("./configs/models");
const appConfig = require("./configs/env.config");
const sequelize = require("./configs/connection");
const limiter = require("./common/ratelimit/RateLimit");
const admin = require("./routes/indexAdmin");
const user = require("./routes/indexUser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(limiter);

app.use('/v1', admin);
app.use('/v2', user);

app.listen(appConfig.PORT, async () => {
  console.log(`Running port ${appConfig.PORT}.`);
  try {
    await sequelize.sync();
    console.log('Create all table success.');
  } catch (error) {
    console.error('Failed to create table:', error);
  }
});

//role: owner, staff, shipper, admin