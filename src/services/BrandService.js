const { Op } = require("sequelize");
const { Brand } = require("../configs/models");


const brandService = {
    createBrand: async (brand) => {
        try {
            const newBrand = await Brand.create(brand);
            return newBrand;
        } catch (err) {
            throw new Error();
        }
    },
    deleteBrand: async (brand_id) => {
        try {
            const deleteBrand = await Brand.destroy({
                where: {
                    brand_id: brand_id
                }
            });

            return deleteBrand > 0;
        } catch (err) {
            throw new Error();
        }
    },
    updateBrand: async (brand_id, newBrand) => {
        try {
            const updateBrand = await Brand.update(newBrand, {
                where: { brand_id: brand_id }
            });

            return updateBrand > 0;
        } catch (err) {
            throw new Error();
        }
    },
    findBrands: async (query) => {
        try {
            const { brand_id } = query;
            const whereCondition = {};

            if(brand_id){ whereCondition.brand_id = brand_id }


            const brands = await Brand.findAll({ 
                where: whereCondition,
            });
            return brands;
        } catch (err) {
            throw new Error();
        }
    },
    findBrandsPage: async (query) => {
        try {
            const { brand_id, brand_name } = query;
            const whereCondition = {};

            if(brand_id){ whereCondition.brand_id = brand_id }
            if (brand_name) {
                whereCondition.brand_name = {
                    [Op.like]: `%${brand_name}%`
                };
            }

            let page = query.page;
            let limit = query.limit;
            if(!page) page = 1;
            if(!limit) limit = 5;
            const offset = (page - 1) * limit;

            const count = await Brand.count({
                where: whereCondition
            });

            const brands = await Brand.findAll({ 
                where: whereCondition,
                order: [['brand_id', 'DESC']],
                limit: limit,
                offset: offset
            });
            return { count, rows: brands};
        } catch (err) {
            throw new Error();
        }
    },
    findBrandById: async (brand_id) => {
        try {
            const brand = await Brand.findByPk(brand_id);
            return brand;
        } catch (err) {
            throw new Error();
        }
    }
}

module.exports = brandService;