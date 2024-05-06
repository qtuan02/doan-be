const { Order, OrderDetails, Customer } = require("../configs/models");

const orderService = {
    findOrders: async () => {
        try{
            const orders = await Order.findAll(
                {include: [Customer]}
            );
            return orders;
        }catch(err){
            throw new Error();
        }
    },
    createOrder: async (customer_id, total_price, order_address, payment_method) => {
        try{
            const order_date = new Date().toLocaleDateString('vi-VN');
            const status = "Đang chờ";
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
    }
}

module.exports = orderService;