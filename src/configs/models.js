const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Category = sequelize.define("categories", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
    timestamps: false
});

const Brand = sequelize.define("brands", {
  brand_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
    timestamps: false
});

const Product = sequelize.define("products", {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: DataTypes.STRING(255),
  product_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
    timestamps: false
});

const Image = sequelize.define("images", {
  image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false
});

const Cart = sequelize.define("carts", {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false
});

const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  birth: DataTypes.STRING(11),
  gender: DataTypes.STRING(10),
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  role: DataTypes.STRING(20)
}, {
    timestamps: false
});

const Order = sequelize.define("orders", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fullname: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  total_price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  order_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  order_date: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
    timestamps: false
});

const OrderDetail = sequelize.define("order_detail", {
  order_detail_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false
});


Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Brand, { foreignKey: "brand_id" });
Image.belongsTo(Product, { foreignKey: "product_id" });
OrderDetail.belongsTo(Product, { foreignKey: "product_id" });
OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
Order.belongsTo(User, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  Category,
  Brand,
  Product,
  Cart,
  User,
  Order,
  OrderDetail,
  Image
};
