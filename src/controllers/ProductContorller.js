const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const productService = require("../services/ProductService");
const imageService = require("../services/ImageService");

const productController = {
    createProduct: async (req, res) => {
        const { image, category_id, brand_id, product_name, price, description, quantity, status, promotion, quantity_sold, images } = req.body;
        if(!image || !category_id || !brand_id || !product_name || !price || !quantity || !status){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const product = await productService.createProduct({image, category_id, brand_id,
            product_name, price, description, quantity, status, promotion, quantity_sold});
        
        if(!product){
            return res.status(400).send(JsonResponse(400, Message.CREATE_PRODUCT_FAIL, null));
        }

        const savedImages = [];
        try{
            for(let i=0; i < images.length; i++){
                const createImage = await imageService.createImage({url: images[i], product_id: product.product_id});
                savedImages.push(createImage);
            }
        }catch(err){
            throw new Error();
        }

        if(savedImages.length !== images.length){
            return res.status(400).send(JsonResponse(400, Message.CREATE_IMAGE_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.CREATE_PRODUCT_SUCCESS, true));
    },
    findOne: async (req, res) => {
        const product = await productService.findOne(req.params.id);
        if(!product){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_PRODUCT, null));
        }
        return res.status(200).send(JsonResponse(200, "", product)); 
    },
    findProducts: async (req, res) => {
        const products = await productService.findProducts(req.query);
        return res.status(200).send(JsonResponse(200, products.count, products.rows));
    },
    deleteProduct: async (req, res) => {
        const product_id = req.params.id;
        const product = await productService.findProductById(product_id);
        if(!product){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_PRODUCT, null));
        }

        const deleteImages = await imageService.deleteImages(product_id);
        if(!deleteImages){
            return res.status(400).send(JsonResponse(400, Message.DELETE_IMAGE_FAIL, null));
        }

        const isDeleted = await productService.deleteProduct(product_id);
        if(!isDeleted){
            return res.status(400).send(JsonResponse(400, Message.DELETE_PRODUCT_FAIL, null));
        }
        
        return res.status(200).send(JsonResponse(200, Message.DELETE_PRODUCT_SUCCESS, true));
    },
    updateProduct: async(req, res) => {
        const product_id = req.params.id;
        const { image, category_id, brand_id, product_name, price, description, quantity, status, promotion, quantity_sold } = req.body;
            
        const oldProduct = await productService.findOne(product_id);
        if(!oldProduct){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_PRODUCT, null));
        }

        const isUpdated = await productService.updateProduct(product_id, 
            { image, category_id, brand_id, product_name, price, description, quantity, status, promotion, quantity_sold });
        if(!isUpdated){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_PRODUCT_FAIL, null));
        }
    
        return res.status(200).send(JsonResponse(200, Message.UPDATE_PRODUCT_SUCCESS, true));
    },
    createImageDescription: async (req, res) => {
        const { url, product_id } = req.body;
        const newImage = await imageService.createImage({url, product_id});
        if(!newImage){
            return res.status(400).send(JsonResponse(400, Message.IMAGE_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.IMAGE_SUCCESS, true));
    },
    deleteImageDescription: async(req, res) => {
        const image_id = req.params.id;
        const image = await imageService.findOne(image_id);
        if(!image){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_IMAGE, null));
        }

        const isDeleted = await imageService.deleteImage(image_id);
        if(!isDeleted){
            return res.status(400).send(JsonResponse(400, Message.DELETE_IMAGE_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.DELETE_IMAGE_SUCCESS, true));
    }
}

module.exports = productController;