const { logger }    = require("../utils/logger.js");

class CartRepository {
    constructor(dao){
        this.dao = dao
    }

    getCarts = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            logger.error(error)
        }
    }

    getCartByID = async(cid) => {
        try {
            return await this.dao.getCart(cid)
        } catch (error) {
            logger.error(error)
        }
    }

    createCart = async() => {
        try {
            return await this.dao.create()
        } catch (error) {
            logger.error(error)
        }
    }

    addProductAndUpdate = async(cid, pid) => {
        try {
            return await this.dao.addAndUpdate(cid, pid)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteProduct = async(cid, pid) => {
        try {
            return await this.dao.deleteOne(cid, pid)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteAllProd = async(cid) => {
        try {
            return await this.dao.deleteAll(cid)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteCart = async(cid) => {
        try {
            return await this.dao.delete(cid)
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = {
    CartRepository
}