const { Image } = require("../configs/models");


const imageService = {
    findByProductId: async (product_id) => {
        try {
            const images = await Image.findAll({
                where: { product_id: product_id }
            });
            return images;
        } catch (err) {
            throw new Error();
        }
    },
    findOne: async (image_id) => {
        try {
            const image = await Image.findByPk(image_id);
            return image;
        } catch (err) {
            throw new Error();
        }
    },
    createImage: async (image) => {
        try {
            const newImage = await Image.create(image);
            return newImage;
        } catch (err) {
            throw new Error();
        }
    },
    createProductImage: async (newImage) => {
        try {
            const newImage = await Image.create(newImage);
            return newImage;
        } catch (err) {
            throw new Error();
        }
    },
    deleteImages: async (product_id) => {
        try{
            const deleteRows = await Image.destroy({
                where: { product_id: product_id}
            });

            return deleteRows > 0;
        }catch(err){
            throw new Error();
        }
    },
    deleteImage: async (image_id) => {
        try{
            const isDeleted = await Image.destroy({
                where: { image_id: image_id }
            });

            return isDeleted > 0;
        }catch(err){
            throw new Error();
        }
    },
    updateImage: async (image_id, url) => {
        try{
            const isUpdated = await Image.update({url: url},{
                where: { image_id: image_id }
            });

            return isUpdated > 0;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = imageService;