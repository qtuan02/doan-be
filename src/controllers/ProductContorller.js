const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const productService = require("../services/ProductService");
const imageService = require("../services/ImageService");


const productController = {
    createProduct: async (req, res) => {
        const { image, category_id, brand_id, product_name, price, description, quantity, status, images } = req.body;
        if(!image || !category_id || !brand_id || !product_name || !price || !quantity || !status){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const product = await productService.createProduct({image, category_id, brand_id,
            product_name, price, description, quantity, status});
        
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
        const {  image, category_id, brand_id, product_name, price, description, quantity, status } = req.body;
            
        const oldProduct = await productService.findProductById(product_id);
        if(!oldProduct){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_PRODUCT, null));
        }

        const newProduct = await productService.updateProduct(product_id, 
            {image, category_id, brand_id, product_name, price, description, quantity, status});
        if(!newProduct){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_PRODUCT_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_PRODUCT_SUCCESS, true));
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
    },
    updateImageDescription: async(req, res) => {
        const image_id = req.params.id;
        const { url } = req.body;

        if(!image_id || !url){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const image = await imageService.findOne(image_id);
        if(!image){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_IMAGE, null));
        }

        const isUpdated = await imageService.updateImage(image_id, url);
        if(!isUpdated){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_IMAGE_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_IMAGE_SUCCESS, true));
    }
}

module.exports = productController;