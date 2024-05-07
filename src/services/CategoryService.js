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
            const { category_id } = query;
            const whereCondition = {};

            if(category_id){ whereCondition.category_id = category_id }
            const categories = await Category.findAll({ where: whereCondition });
            return categories;
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