const { Op, where } = require("sequelize");
const bcrypt = require("bcrypt");
const { Customer } = require("../configs/models");
const { omit } = require('lodash');
const { findCustomers } = require("../controllers/CustomerController");

const customerService = {
    findCustomers: async (query) => {
        try{
            const { phone } = query;
            const whereCondition = {};

            if(phone){ whereCondition.phone = phone }
            const customers = await Customer.findAll({
                where: whereCondition
            });
            return customers;
        }catch(err){
            throw new Error();
        }
    },
    findByEmail: async (email) => {
        try{
            const customer = await Customer.findOne({
                where: { email: email}
            });
            return customer;
        }catch(err){
            throw new Error();
        }
    },
    findByPhone: async (phone) => {
        try{
            const customer = await Customer.findOne({
                where: { phone: phone }
            });
            return customer;
        }catch(err){
            throw new Error();
        }
    },
    findByPhoneOrEmail: async (account) => {
        try{
            const customer = await Customer.findOne({
                where: {
                    [Op.or]: [
                        { phone: account },
                        { email: account }
                    ]
                }
            });

            return customer;
        }catch(err){
            throw new Error();
        }
    },
    checkPassword: async (password, confirmPassword) => {
        return await bcrypt.compare(password, confirmPassword);
    },
    createCustomer: async (customer) => {
        try{
            customer.password = await bcrypt.hash(customer.password, 11);
            const newCustomer = await Customer.create(customer);
            return omit(newCustomer.toJSON(), 'password');
        }catch(err){
            throw new Error();
        }
    },
    changePassword: async (email, password) =>{
        try{
            password = await bcrypt.hash(password, 11);
            const changePassword = await Customer.update({ password }, {
                where: { email: email }
            });

            return changePassword > 0;
        }catch(err){
            throw new Error();
        }
    },
    updateCustomer: async (email, newData) => {
        try{
            const updateCustomer = await Customer.update(newData, {
                where: { email: email }
            });

            return updateCustomer > 0;
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = customerService;