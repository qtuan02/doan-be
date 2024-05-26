const { Op } = require("sequelize");
const { Product, Category, Brand, Image } = require("../configs/models");
const imageService = require("./ImageService");
const { omit } = require("lodash");


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
            
            return updateProduct;
        }catch(err){
            throw new Error();
        }
    },
    findOne: async (product_id) => {
        try{
            const product = await Product.findOne({
                where: { product_id: product_id },
                include: [ Category, Brand ]
            });

            const formattedProduct = product.toJSON();
            const images = await imageService.findByProductId(product.product_id);
            formattedProduct.images = images;
            return omit(formattedProduct, ['brand_id', 'category_id']);
        }catch(err){
            throw new Error();
        }
    },
    findProducts: async (query) => {
        try{
            const { brand_id, category_id, product_name, status, page, limit } = query;
            const whereCondition = {};

            if(brand_id){ whereCondition.brand_id = brand_id };
            if(category_id){ whereCondition.category_id = category_id };
            if(product_name){
                whereCondition.product_name = {
                    [Op.like]: `%${product_name}%`
                };
            };
            if(status) { whereCondition.status = status };

            const options = {
                where: whereCondition,
                order: [['product_id', 'desc']],
                include: [ Category, Brand ]
            };

            if(page && limit) {
                const offset = (page - 1) * limit;
                options.limit = parseInt(limit);
                options.offset = parseInt(offset);
            }

            const count = await Product.count({
                where: whereCondition,
            });

            const products = await Product.findAll(options);

            const formattedProducts = [];
            for (const product of products) {
                const formattedProduct = product.toJSON();
                const images = await imageService.findByProductId(product.product_id);
                formattedProduct.images = images.map(image => image.url);
                formattedProduct.brand_name = product.brand.brand_name;
                formattedProduct.category_name = product.category.category_name;
                formattedProducts.push(formattedProduct);
            }

            return {count: count, rows: formattedProducts.map(p => omit(p, ['brand_id', 'category_id', 'brand', 'category']))};
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = productService;