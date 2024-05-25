const { Op } = require("sequelize");
const { User } = require("../configs/models");
const bcrypt = require('bcrypt');

const userService = {
    findAll: async () => {
        try{
            const users = await User.findAll({
                where: {
                    email: { [Op.ne]: "tuan@gmail.com" }
                }
            });
            return users;
        }catch(err){
            throw new Error();
        }
    },
    findByPhoneOrEmail: async (account) => {
        try{
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { phone: account },
                        { email: account }
                    ]
                }
            });
            return user;
        }catch(err){
            throw new Error();
        }
    },
    countByPhoneOrEmail: async (account) => {
        try{
            const count = await User.count({
                where: {
                    [Op.or]: [
                        { phone: account },
                        { email: account }
                    ]
                }
            });
            return count;
        }catch(err){
            throw new Error();
        }
    },
    checkPassword: async (password, confirmPassword) => {
        return await bcrypt.compare(password, confirmPassword);
    },
    createUser: async (user) => {
        try{
            user.status = await 1;
            user.password = await bcrypt.hash(user.password, 11);
            const newUser = await User.create(user);
            return newUser;
        }catch(err){
            throw new Error();
        }
    },
    changePassword: async (email, password) =>{
        try{
            password = await bcrypt.hash(password, 11);
            const changePassword = await User.update({ password }, {
                where: { email: email }
            });

            return changePassword > 0;
        }catch(err){
            throw new Error();
        }
    },
    changeProfile: async (email, newData) => {
        try{
            const updateUser = await User.update(newData, {
                where: { email: email }
            });

            return updateUser > 0;
        }catch(err){
            throw new Error();
        }
    },
    updateUser: async (user_id, newData) => {
        try{
            if(newData.password){
                newData.password = await bcrypt.hash(newData.password, 11);
            };
            const updateUser = await User.update(newData, {
                where: { user_id: user_id }
            });
            
            return updateUser;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = userService;