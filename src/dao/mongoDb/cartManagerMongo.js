const { cartModel } = require("../models/cartModel.js")
const { productModel } = require("../models/productModel")

class CartManager {
    async createCart(){
        try {
            return await cartModel.create({})
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts(){
        try {
            return await cartModel.find()
        } catch (error) {
            console.log(error);
        }
    }

    async getCartByID(cid){
        try {
           return await cartModel.findOne({_id: cid}).lean()
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(cid, pid){
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

    async deleteProduct(cid, pid){
        try {
            let prod = await productModel.findById(pid)

            return await cartModel.updateOne({_id: cid}, {$pull:{products:{product: prod}}})
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProd(cid){
        try {
            return await cartModel.updateOne({_id:cid}, {products:[]})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartManager