const categoryService = require("../services/CategoryService");
const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");

const categoryController = {
    createCategory: async (req, res) => {
        const { category_image, category_name } = req.body;
        if (!category_name) {
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const category = await categoryService.createCategory({ category_image, category_name });

        if (!category) {
            return res.status(400).send(JsonResponse(400, Message.CREATE_CATEGORY_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.CREATE_CATEGORY_SUCCESS, category));
    },
    findCategories: async (req, res) => {
        const categories = await categoryService.findCategories(req.query);
        return res.status(200).send(JsonResponse(200, categories.count, categories.rows));
    },
    deleteCategory: async (req, res) => {
        const category_id = req.params.id;
        if (!category_id) {
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const isDeleted = await categoryService.deleteCategory(category_id);
        if (!isDeleted) {
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_CATEGORY, null));
        }

        return res.status(200).send(JsonResponse(200, Message.DELETE_CATEGORY_SUCCESS, null));
    },
    updateCategory: async (req, res) => {
        const category_id = req.params.id;
        const { category_image, category_name } = req.body;

        const oldCategory = await categoryService.findCategoryById(category_id);
        if (!oldCategory) {
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_CATEGORY, null));
        }

        const newCategory = await categoryService.updateCategory(category_id, { category_image, category_name });
        if (!newCategory) {
            return res.status(400).send(JsonResponse(400, Message.UPDATE_CATEGORY_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_CATEGORY_SUCCESS, null));
    }
}

module.exports = categoryController;