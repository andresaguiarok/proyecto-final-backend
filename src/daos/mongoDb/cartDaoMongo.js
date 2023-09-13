const { cartModel }    = require("../models/cartModel.js")
const { productModel } = require("../models/productModel")
const { logger }       = require("../../utils/logger.js");

class CartDaoMongo{
    async create(){
        try {
            return await cartModel.create({})
        } catch (error) {
            logger.error(error)
        }
    }

    async get(){
        try {
            return await cartModel.find()
        } catch (error) {
            logger.error(error)
        }
    }

    async getCart(id){
        try {
           return await cartModel.findOne({_id: id}).lean()
        } catch (error) {
            logger.error(error)
        }
    }

    async addAndUpdate(cid, pid){
        try {
            const cart = await cartModel.findById({_id: cid})
            const products = cart.products.find(prod => prod.product._id == pid)

            if(!products){
                return await cartModel.updateOne(
                    {_id: cid},{$push: {products: {product: pid, quantity: 1}}}
                )
            }else{
                return await cartModel.updateOne(
                    { _id: cid, "products.product": pid },
                    {$inc : {"products.$.quantity": 1}},
                    {new: true, upset:true}
                )
            }
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteOne(cid, pid){
        try {
            let prod = await productModel.findById(pid)

            return await cartModel.updateOne({_id: cid}, {$pull:{products:{product: prod}}})
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteAll(id){
        try {
            return await cartModel.updateOne({_id: id}, {products:[]})
        } catch (error) {
            logger.error(error)
        }
    }

    async delete(id){
        try {
            return await cartModel.deleteOne({_id : id})
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = CartDaoMongo