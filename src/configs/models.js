const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Category = sequelize.define("category", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
    timestamps: false
});

const Brand = sequelize.define("brand", {
  brand_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
    timestamps: false
});

const Product = sequelize.define("product", {
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
  image_1: DataTypes.STRING(255),
  image_2: DataTypes.STRING(255),
  image_3: DataTypes.STRING(255),
  image_4: DataTypes.STRING(255),
  image_5: DataTypes.STRING(255),
  image_6: DataTypes.STRING(255),
  product_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
    timestamps: false
});

const Cart = sequelize.define("cart", {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cart_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false
});

const Customer = sequelize.define("customer", {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_firstname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  customer_lastname: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  address: DataTypes.STRING(255),
  email: {
    type: DataTypes.STRING(100),
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
}, {
    timestamps: false
});

const Order = sequelize.define("order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
}, {
    timestamps: false
});

const OrderDetails = sequelize.define("orderDetails", {
  order_details_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
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

const Staff = sequelize.define("staff", {
  staff_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  staff_firstname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  staff_lastname: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  address: DataTypes.STRING(255),
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
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false
});

const Role = sequelize.define("role", {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
    timestamps: false
});

Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Brand, { foreignKey: "brand_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });
OrderDetails.belongsTo(Order, { foreignKey: "order_id" });
Staff.belongsTo(Role, { foreignKey: "role_id" });

module.exports = {
  Category,
  Brand,
  Product,
  Cart,
  Customer,
  Order,
  OrderDetails,
  Staff,
  Role,
};
