const cartModel = require("../models/cartModel")
const prodModel = require("../models/productModel")

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
           return await cartModel.findOne({_id: cid}) 
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(cid){
        try {
            let cart = await cartModel.findById(cid)
            cart.products.push({ product : "6452dcbfc6cb9eb064973978", quantity: 1})

            return await cartModel.updateOne(cart)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(cid){
        try {
            return await cartModel.deleteOne({_id: cid})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartManager