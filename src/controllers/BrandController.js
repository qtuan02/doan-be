const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const brandService = require("../services/BrandService");

const brandController = {
    createBrand: async (req, res) => {
        const { brand_name } = req.body;
        if (!brand_name) {
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const brand = await brandService.createBrand({ brand_name });

        if (!brand) {
            return res.status(400).send(JsonReponse(400, Message.CREATE_BRAND_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.CREATE_BRAND_SUCCESS, brand));
    },
    findBrands: async (req, res) => {
        const brands = await brandService.findBrands(req.query);
        return res.status(200).send(JsonReponse(200, Message.FIND_BRAND, brands));
    },
    findBrandsPage: async (req, res) => {
        const brands = await brandService.findBrandsPage(req.query);
        return res.status(200).send(JsonReponse(200, Message.FIND_BRAND, brands));
    },
    deleteBrand: async (req, res) => {
        const brand_id = req.params.id;
        if (!brand_id) {
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_BRAND, null));
        }

        const isDeleted = await brandService.deleteBrand(brand_id);
        if (!isDeleted) {
            return res.status(400).send(JsonReponse(400, Message.DELETE_BRAND_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.DELETE_BRAND_SUCCESS, null));
    },
    updateBrand: async (req, res) => {
        const brand_id = req.params.id;
        const { brand_name } = req.body;

        const oldBrand = await brandService.findBrandById(brand_id);
        if (!oldBrand) {
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_BRAND, null));
        }

        const newBrand = await brandService.updateBrand(brand_id, { brand_name });
        if (!newBrand) {
            return res.status(400).send(JsonReponse(400, Message.UPDATE_BRAND_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.UPDATE_BRAND_SUCCESS, null));
    }
}

module.exports = brandController;