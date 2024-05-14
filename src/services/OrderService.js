const { Order, OrderDetails, Customer, Product } = require("../configs/models");
const productService = require("./ProductService");

const orderService = {
    findOrder: async (order_id) =>{
        try{
            const order = await Order.findOne({ where: { order_id: order_id }});
            return order;
        }catch(err){
            throw new Error();
        }
    },
    findOrders: async (query) => {
        try{
            const { phone, order_id, status } = query;

            if(order_id){
                const orders = await OrderDetails.findAll({ 
                    where: { order_id: order_id }
                });

                const infoOrders = [];
                for(const order of orders){
                    const product = await productService.findProductById(order.product_id);
                    infoOrders.push({
                        order_details_id: order.order_details_id,
                        order_id: order.order_id,
                        quantity: order.quantity,
                        price: order.price,
                        product: product
                    });
                }

                return infoOrders;
            }

            const whereCondition = {};
            const whereConditionCustomer = {};
            if(phone){ whereConditionCustomer.phone = phone }
            if(status){ whereCondition.status = status }

            let page = query.page;
            let limit = query.limit;
            if(!page) page = 1;
            if(!limit) limit = 5;
            const offset = (page - 1) * limit;

            const count = await Brand.count();

            const orders = await Order.findAll({
                where: whereCondition,
                include: [{
                    model: Customer,
                    where: whereConditionCustomer
                }],
                limit: limit,
                offset: offset
            });
            return {count, rows: orders};
        }catch(err){
            throw new Error();
        }
    },
    createOrder: async (customer_id, total_price, order_address, payment_method) => {
        try{
            const order_date = new Date().toLocaleDateString('vi-VN');
            const status = "pending";
            const order = await Order.create({ customer_id, total_price, order_address, order_date, payment_method, status });
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
                const quantity = cart.cart_quantity;
                const orderDetail = await OrderDetails.create({ order_id, price, quantity, product_id });
                order_details.push(orderDetail);
            }
    
            return order_details.length === count;
        }catch(err){
            throw new Error();
        }
    },
    deleteOrder: async (order_id) => {
        try{
            const deleteAll = await Order.destroy({
                where: { order_id: order_id }
            });

            return deleteAll;
        }catch(err){
            throw new Error();
        }
    },
    deleteAll: async (order_id) => {
        try{
            const deleteAll = await OrderDetails.destroy({
                where: { order_id: order_id }
            });

            return deleteAll;
        }catch(err){
            throw new Error();
        }
    },
    updateOrder: async (order_id, newData) => {
        try{
            const updateOrder = await Order.update(newData, {
                where: { order_id: order_id }
            });

            return updateOrder > 0;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = orderService;