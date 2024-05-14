const { Op } = require("sequelize");
const { Product, Category, Brand } = require("../configs/models");


const productService = {
    createProduct: async (product) => {
        try{
            const newProduct = await Product.create(product);
            return newProduct;
        }catch(err){
            throw new Error();
        }
    },
    deleteProduct: async (product_id) => {
        try{
            const deleteProduct = await Product.destroy({
                where: {
                    product_id: product_id
                }
            });

            return deleteProduct > 0;
        }catch(err){
            throw new Error();
        }
    },
    updateProduct: async (product_id, newData) => {
        try{
            const updateProduct = await Product.update(newData, {
                where: { product_id: product_id }
            });
            
            return updateProduct > 0;
        }catch(err){
            throw new Error();
        }
    },
    findProducts: async (query) => {
        try{
            const { brand_id, category_id, product_name, status, product_id } = query;
            const whereCondition = {};

            if(product_id){ whereCondition.product_id = product_id };
            if(brand_id){ whereCondition.brand_id = brand_id };
            if(category_id){ whereCondition.category_id = category_id };
            if(product_name){
                whereCondition.product_name = {
                    [Op.like]: `%${product_name}%`
                };
            };
            if(status) { whereCondition.status = status };

            const products = await Product.findAll({
                where: whereCondition,
                include: [Category, Brand],
            });

            return products;
        }catch(err){
            throw new Error();
        }
    },
    findProductsPage: async (query) => {
        try{
            const { brand_id, category_id, product_name, status, product_id } = query;
            const whereCondition = {};

            if(product_id){ whereCondition.product_id = product_id };
            if(brand_id){ whereCondition.brand_id = brand_id };
            if(category_id){ whereCondition.category_id = category_id };
            if(product_name){
                whereCondition.product_name = {
                    [Op.like]: `%${product_name}%`
                };
            };
            if(status) { whereCondition.status = status };

            let page = query.page;
            let limit = query.limit;
            if(!page) page = 1;
            if(!limit) limit = 5;
            const offset = (page - 1) * limit;

            const count = await Product.count();

            const products = await Product.findAll({
                where: whereCondition,
                include: [Category, Brand],
                order: [['product_id', 'DESC']],
                limit: limit,
                offset: offset
            });

            return {count, rows: products};
        }catch(err){
            throw new Error();
        }
    },
    findProductById: async (product_id) => {
        try{
            const product = await Product.findByPk(product_id);
            return product;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = productService;