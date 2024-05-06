const { Cart } = require("../configs/models");
const productService = require("./ProductService");


const cartService = {
    findItem: async (cart_id) => {
        try{
            const item = await Cart.findOne({
                where: { cart_id: cart_id }
            });

            return item;
        }catch(err){
            throw new Error();
        }
    },
    addItem: async (customer_id, product_id, cart_quantity) => {
        try{
            const item = await Cart.create({ customer_id, product_id, cart_quantity });
            return item;
        }catch(err){
            throw new Error();
        }
    },
    deleteItem: async (cart_id, customer_id) => {
        try{
            const item = await Cart.destroy({
                where: { 
                    cart_id: cart_id,
                    customer_id: customer_id
                }
            });
            return item > 0;
        }catch(err){
            throw new Erro();
        }
    },
    changeQuantity: async (customer_id, cart_id,  cart_quantity) => {
        try{
            const updateQuantity = await Cart.update({ cart_quantity }, {
                where: { 
                    cart_id: cart_id,
                    customer_id: customer_id
                }
            });

            return updateQuantity > 0;
        }catch(err){
            throw new Error();
        }
    },
    findCartByCustomer: async (customer_id) => {
        try{
            const carts = await Cart.findAll({
                where: { customer_id: customer_id },
            });

            const infoCarts = [];
            for (const cart of carts) {
                const product = await productService.findProductById(cart.product_id);
                infoCarts.push({ cart_id: cart.cart_id,
                    product: {
                        product_id: product.product_id,
                        image: product.image_1,
                        product_name: product.product_name,
                        price: product.price
                    },
                    cart_quantity: cart.cart_quantity });
            }
            return infoCarts;
        }catch(err){
            throw new Error();
        }
    },
    deleteAll: async (customer_id) => {
        try {
            const deletedRows = await Cart.destroy({
                where: { customer_id: customer_id }
            });
            return deletedRows > 0;
        } catch (err) {
            throw new Error();
        }
    },
    checkItem: async (customer_id, product_id) => {
        try{
            const checkItemOnCart = await Cart.findOne({
                where: {
                    customer_id: customer_id,
                    product_id: product_id
                }
            });
            return checkItemOnCart;
        }catch(err){
            throw new Error();
        }
    }
}


module.exports = cartService;