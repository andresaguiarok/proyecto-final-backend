const { productModel } = require("../models/productModel")

class ProductDaoMongo{

    async create(newProduct){
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            console.log(error);
        }
    }

    async get(page, sort){
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

    async getBy(data){
        try {
            return await productModel.findOne({...data})
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, updateBody){
        try {
            return await productModel.updateOne({_id: id}, updateBody)
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id){
        try {
            return await productModel.deleteOne({_id: id})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductDaoMongo