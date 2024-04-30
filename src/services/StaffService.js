const { Op } = require("sequelize");
const { Staff, Role } = require("../configs/models");
const bcrypt = require('bcrypt');

const staffService = {
    findByPhoneOrEmail: async (account) => {
        try{
            const staff = await Staff.findOne({
                where: {
                    [Op.or]: [
                        { phone: account },
                        { email: account }
                    ]
                }, include: [Role]
            });
            return staff;
        }catch(err){
            throw new Error();
        }
    },
    checkPassword: async (password, confirmPassword) => {
        return await bcrypt.compare(password, confirmPassword);
    }
}

module.exports = staffService;