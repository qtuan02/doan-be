const { omit } = require("lodash");
const { Order, OrderDetail, User, Product } = require("../configs/models");

const orderService = {
    findOrderDetail: async (order_id) => {
        try{
            const orderdetails = await OrderDetail.findAll({
                where: { order_id: order_id },
                include: [ Product ]
            });
            const formattedOrderDetails = orderdetails.map(od => {
                const odJson = od.toJSON();
                const formattedOrderDetail = omit(odJson, ["product_id"]);
                if (formattedOrderDetail.product) {
                    formattedOrderDetail.product = omit(formattedOrderDetail.product, ["category_id", "brand_id", "description", "quantity", "status"]);
                }
                return formattedOrderDetail;
            });
    
            return formattedOrderDetails;
        }catch(err){
            throw new Error();
        }
    },
    findOrderByCustomer: async (user_id) => {
        try{
            const orders = await Order.findAll({
                where: { user_id: user_id }
            });

            const formattedOrders = [];
            for (const order of orders) {
                const order_detail = await orderService.findOrderDetail(order.order_id);
                formattedOrders.push({
                    ...omit(order.toJSON(), ["user_id"]),
                    order_detail: order_detail
                });
            }

            return formattedOrders;
        }catch(err){
            throw new Error();
        }
    },
    findOrders: async (query) => {
        try{
            const { phone, status, page, limit } = query;
            const whereCondition = {};
            const whereConditionCustomer = {};
            

            if(phone) { whereConditionCustomer.phone = phone };
            if(status) { whereCondition.status = status };

            const options = {
                where: whereCondition,
                order: [['order_id', 'desc']],
                include: [{
                    model: User,
                    where: whereConditionCustomer
                }],
            };

            if(page && limit) {
                const offset = (page - 1) * limit;
                options.limit = parseInt(limit);
                options.offset = parseInt(offset);
            }

            const count = await Order.count({
                where: whereCondition,
                include: [{
                    model: User,
                    where: whereConditionCustomer
                }],
            });

            const orders = await Order.findAll(options);
            return { count: count, rows: orders };
        }catch(err){
            throw new Error();
        }
    },
    createOrder: async (user_id, total_price, order_address, payment_method, fullname, phone) => {
        try{
            const order_date = new Date().toLocaleDateString('vi-VN');
            const status = "pending";
            const order = await Order.create({ user_id, total_price, order_address, order_date, payment_method, fullname, phone, status });
            return order;
        }catch(err){
            throw new Error();
        }
    },
    createOrderAnonymous: async (total_price, order_address, payment_method, fullname, phone) => {
        try{
            const order_date = new Date().toLocaleDateString('vi-VN');
            const status = "pending";
            const order = await Order.create({ total_price, order_address, order_date, payment_method, fullname, phone, status });
            return order;
        }catch(err){
            throw new Error();
        }
    },
    createOrderDetail: async (order_id, carts) => {
        try{
            const count = carts.length;
            const order_details = [];

            for (const cart of carts) {
                const { product_id, price } = cart.product;
                const quantity = cart.quantity;
                const orderDetail = await OrderDetail.create({ order_id, price, quantity, product_id });
                order_details.push(orderDetail);
            }
    
            return order_details.length === count;
        }catch(err){
            throw new Error();
        }
    },
    createOrderDetailAnonymous: async (order_id, carts) => {
        try{
            const count = carts.length;
            const order_details = [];

            for (const cart of carts) {
                const { product_id, price, quantity } = cart;
                const orderDetail = await OrderDetail.create({ order_id, price, quantity, product_id });
                order_details.push(orderDetail);
            }
    
            return order_details.length === count;
        }catch(err){
            throw new Error();
        }
    },
    deleteOrder: async (order_id) => {
        try{
            const deleteOrder = await Order.destroy({
                where: { order_id: order_id }
            });

            return deleteOrder;
        }catch(err){
            throw new Error();
        }
    },
    deleteAll: async (order_id) => {
        try{
            const deleteAll = await OrderDetail.destroy({
                where: { order_id: order_id }
            });

            return deleteAll ;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = orderService;