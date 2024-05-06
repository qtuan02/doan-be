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
    findBrands: async () => {
        try {
            const brands = await Brand.findAll();
            return brands;
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