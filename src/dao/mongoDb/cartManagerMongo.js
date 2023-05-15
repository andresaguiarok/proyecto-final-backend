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
           return await cartModel.findOne({_id: cid})
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(cid, pid){
        try {
            let prod = await productModel.findById(pid)
            let cart = await cartModel.findById(cid)
            
            let prodMore = await cartModel.findOneAndUpdate(
                { _id: cart, "products.product": prod },
                {$inc : {"products.$.quantity": 1}},
                {new: true, upset:true}
            )
            
            let prodAdd = await cartModel.updateOne(
                {_id: cart},{$push: {products: {product:prod, quantity: 1}}}
            ) 
            
            prodAdd = prodMore

            if(!prodAdd) return
            if(!prod) return

            return await cartModel.updateOne(prodAdd)
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