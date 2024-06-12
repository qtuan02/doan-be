const { Brand, Category, Product, Order, User } = require("../configs/models");


const dashboardService = {
    count: async () => {
        try{
            const countBrand = await Brand.count();
            const countCategory =  await Category.count();
            const countProduct = await Product.count();
            const countOrder = await Order.count();
            const countUser = await User.count();

            const arr = {
                brand: countBrand,
                category: countCategory,
                product: countProduct,
                order: countOrder,
                user: countUser
            };

            return arr;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = dashboardService;