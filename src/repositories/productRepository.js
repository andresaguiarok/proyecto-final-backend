const { logger } = require("../utils/logger.js");

class ProductsRespository {
    constructor(dao){
        this.dao = dao
    }

    getProducts = async(data) => {
        try {
            return await this.dao.get(data)
        } catch (error) {
            logger.error(error)
        }
    }

    getProduct = async(product) => {
        try {
            return await this.dao.getBy(product)
        } catch (error) {
            logger.error(error)
        }
    }

    addProduct = async(title, description, price, thumbnails, code, stock, owener) => {
        try {
            return await this.dao.create({title, description, price, thumbnails, code, stock, owener});
        } catch (error) {
            logger.error(error)
        }
    }

    updateProduct = async(id , updateBody) => {
        try {
            return await this.dao.update(id, updateBody)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteProduct = async (pid) => {
        try {
            return await this.dao.delete(pid)
        } catch (error) {
            logger.error(error)
        }
    }


}

module.exports = {
    ProductsRespository
}