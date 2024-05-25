const { Op } = require("sequelize");
const { Category } = require("../configs/models");


const categoryService = {
    createCategory: async (category) => {
        try {
            const newCategory = await Category.create(category);
            return newCategory;
        } catch (err) {
            throw new Error();
        }
    },
    deleteCategory: async (category_id) => {
        try {
            const deleteCategory = await Category.destroy({
                where: {
                    category_id: category_id
                }
            });

            return deleteCategory > 0;
        } catch (err) {
            throw new Error();
        }
    },
    updateCategory: async (category_id, newCategory) => {
        try {
            const updateCategory = await Category.update(newCategory, {
                where: { category_id: category_id }
            });

            return updateCategory > 0;
        } catch (err) {
            throw new Error();
        }
    },
    findCategories: async (query) => {
        try {
            const { category_name, page, limit } = query;
            const whereCondition = {};

            if(category_name){
                whereCondition.category_name = {
                    [Op.like]: `%${category_name}%`
                }
            };

            const options = {
                where: whereCondition,
                order: [['category_id', 'desc']],
            };

            if(page && limit) {
                const offset = (page - 1) * limit;
                options.limit = parseInt(limit);
                options.offset = parseInt(offset);
            }

            const count = await Category.count({
                where: whereCondition
            });

            const categories = await Category.findAll(options);
            return { count: count, rows: categories };
        } catch (err) {
            throw new Error();
        }
    }, 
    findCategoryById: async (category_id) => {
        try {
            const category = await Category.findByPk(category_id);
            return category;
        } catch (err) {
            throw new Error();
        }
    }
}

module.exports = categoryService;