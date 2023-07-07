const { cartModel } = require("../models/cartModel.js")
const { productModel } = require("../models/productModel")

class CartManager {
    async create(){
        try {
            return await cartModel.create({})
        } catch (error) {
            console.log(error);
        }
    }

    async get(){
        try {
            return await cartModel.find()
        } catch (error) {
            console.log(error);
        }
    }

    async getCart(id){
        try {
           return await cartModel.findOne({_id: id}).lean()
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }

    async delete(cid, pid){
        try {
            let prod = await productModel.findById(pid)

            return await cartModel.updateOne({_id: cid}, {$pull:{products:{product: prod}}})
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(id){
        try {
            return await cartModel.updateOne({_id: id}, {products:[]})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartManager