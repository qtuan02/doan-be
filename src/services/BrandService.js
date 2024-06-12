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
            const { brand_name, page, limit } = query;
            const whereCondition = {};

            if(brand_name){
                whereCondition.brand_name = {
                    [Op.like]: `%${brand_name}%`
                }
            };

            const options = {
                where: whereCondition,
                order: [['brand_id', 'desc']],
            };

            if(page && limit) {
                const offset = (page - 1) * limit;
                options.limit = parseInt(limit);
                options.offset = parseInt(offset);
            }

            const count = await Brand.count({
                where: whereCondition
            });

            const brands = await Brand.findAll(options);
            return { count: count, rows: brands };
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