const { Op } = require("sequelize");
const { Favorite, Product } = require("../configs/models");

const favoriteService = {
    addFavorite: async (user_id, product_id) => {
        try{
            const item = await Favorite.create({user_id, product_id});
            return item;
        }catch(err){
            throw new Error();
        }
    },
    findOneByUser: async (user_id, product_id) => {
        try{
            const item = await Favorite.findOne({
                where: { user_id: user_id, product_id: product_id }
            });
            return item;
        }catch(err){
            throw new Error();
        }
    },
    findAllByUser: async (user_id) => {
        try{
            const count = await Favorite.count({
                where: { user_id: user_id }
            });

            const favorites = await Favorite.findAll({
                where: { user_id: user_id },
                order: [['favorite_id', 'desc']],
                include: [ Product ]
            });
            return  { count: count, rows: favorites };;
        }catch(err){
            throw new Error();
        }
    },
    findOne: async (favorite_id, user_id) => {
        try{
            const item = await Favorite.findOne({
                where: { favorite_id: favorite_id, user_id: user_id }
            });
            return item;
        }catch(err){
            throw new Error();
        }
    },
    deleteByUser: async (favorite_id) => {
        try{
            const isDeleted = await Favorite.destroy({
                where: { favorite_id: favorite_id }
            });
            return isDeleted > 0;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = favoriteService;