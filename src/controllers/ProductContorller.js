const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const productService = require("../services/ProductService");


const productController = {
    createProduct: async (req, res) => {
        const { 
            image_1, image_2, image_3, image_4, image_5, image_6,
            category_id, brand_id, product_name, price, description, quantity, status } = req.body;
        if(!category_id || !brand_id || !product_name || !price || !quantity || !status){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const product = await productService.createProduct({image_1, image_2, image_3, image_4, image_5, image_6, 
            category_id, brand_id, product_name, price, description, quantity, status});
        
        if(!product){
            return res.status(400).send(JsonReponse(400, Message.CREATE_PRODUCT_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.CREATE_PRODUCT_SUCCESS, product));
    },
    findProducts: async (req, res) => {
        const products = await productService.findProducts(req.query);
        return res.status(200).send(JsonReponse(200, Message.FIND_PRODUCT, products));
    },
    deleteProduct: async (req, res) => {
        const product_id = req.params.id;
        if(!product_id){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_PRODUCT, null));
        }

        const isDeleted = await productService.deleteProduct(product_id);
        if(!isDeleted){
            return res.status(400).send(JsonReponse(400, Message.DELETE_PRODUCT_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.DELETE_PRODUCT_SUCCESS, null));
    },
    updateProduct: async(req, res) => {
        const product_id = req.params.id;
        const { 
            image_1, image_2, image_3, image_4, image_5, image_6,
            category_id, brand_id, product_name, price, description, quantity, status } = req.body;
            
        const oldProduct = await productService.findProductById(product_id);
        if(!oldProduct){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_PRODUCT, null));
        }

        const newProduct = await productService.updateProduct(product_id, 
            {image_1, image_2, image_3, image_4, image_5, image_6, category_id, brand_id, product_name, price, description, quantity, status});
        if(!newProduct){
            return res.status(400).send(JsonReponse(400, Message.UPDATE_PRODUCT_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.UPDATE_PRODUCT_SUCCESS, null));
    }
}

module.exports = productController;