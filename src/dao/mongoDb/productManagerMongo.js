const { productModel } = require("../models/productModel")

class ProductManagerMongo {
    async addProduct(product){
        try {
            return await productModel.create(product)
        } catch (error) {
            console.log(error);
        }
    }

    async getProduct(page, sort){
        try {
            let sortOpt = {}

            if(sort === "asc"){
                sortOpt = {price : 1}
            } else if (sort === "des") {
                sortOpt = {price : -1}
            }

            return await productModel.paginate({}, {limit: 6, page: page , lean: true, sort: sortOpt})
        } catch (error) {
            console.log(error);
        }
    }

    async getProductByID(pid){
        try {
            return await productModel.findOne({_id: pid})
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(pid, obj){
        try {
            return await productModel.updateOne({_id: pid}, obj)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(pid){
        try {
            return await productModel.deleteOne({_id: pid})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManagerMongo