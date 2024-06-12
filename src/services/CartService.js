const { Cart, Product } = require("../configs/models");
const productService = require("./ProductService");

const cartService = {
    checkStatusAndDelete: async () => {
        try{
            const products = await Product.findAll();
            let check = false;

            for (const product of products) {
                if (product.status !== "true") {
                    const isDeleted = await Cart.destroy({
                        where: { product_id: product.product_id }
                    });
                    if(isDeleted > 0) check = true;
                }
            }

            return check;
        }catch(err){
            throw new Error();
        }
    },
    findItem: async (cart_id, user_id) => {
        try{
            const item = await Cart.findOne({
                where: { cart_id: cart_id, user_id: user_id }
            });

            return item;
        }catch(err){
            throw new Error();
        }
    },
    addItem: async (user_id, product_id, quantity) => {
        try{
            const item = await Cart.create({ user_id, product_id, quantity });
            return item;
        }catch(err){
            throw new Error();
        }
    },
    deleteItem: async (cart_id, user_id) => {
        try{
            const item = await Cart.destroy({
                where: { 
                    cart_id: cart_id,
                    user_id: user_id
                }
            });
            return item > 0;
        }catch(err){
            throw new Erro();
        }
    },
    changeQuantity: async (user_id, cart_id,  quantity) => {
        try{
            const updateQuantity = await Cart.update({ quantity: quantity }, {
                where: { 
                    cart_id: cart_id,
                    user_id: user_id
                }
            });

            return updateQuantity > 0;
        }catch(err){
            throw new Error();
        }
    },
    findCartByCustomer: async (user_id) => {
        try{
            const carts = await Cart.findAll({
                where: { user_id: user_id }
            });

            const count = await Cart.count({
                where: { user_id: user_id }
            });

            const infoCarts = [];
            for (const cart of carts) {
                const product = await productService.findOne(cart.product_id);
                infoCarts.push({ cart_id: cart.cart_id,
                    product: {
                        product_id: product.product_id,
                        image: product.image,
                        product_name: product.product_name,
                        price: product.price
                    },
                    quantity: cart.quantity });
            }
            return { count: count, rows: infoCarts };
        }catch(err){
            throw new Error();
        }
    },
    deleteAll: async (user_id) => {
        try {
            const deletedRows = await Cart.destroy({
                where: { user_id: user_id }
            });
            return deletedRows > 0;
        } catch (err) {
            throw new Error();
        }
    },
    checkItem: async (user_id, product_id) => {
        try{
            const checkItemOnCart = await Cart.findOne({
                where: {
                    user_id: user_id,
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