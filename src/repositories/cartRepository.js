class CartRepository {
    constructor(dao){
        this.dao = dao
    }

    getCarts = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            console.log(error);
        }
    }

    getCartByID = async(cid) => {
        try {
            return await this.dao.getCart(cid)
        } catch (error) {
            console.log(error);
        }
    }

    createCart = async() => {
        try {
            return await this.dao.create()
        } catch (error) {
            console.log(error);
        }
    }

    addProductAndUpdate = async(cid, pid) => {
        try {
            return await this.dao.addAndUpdate(cid, pid)
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async(cid, pid) => {
        try {
            return await this.dao.deleteOne(cid, pid)
        } catch (error) {
            console.log(error);
        }
    }

    deleteAllProd = async(cid) => {
        try {
            return await this.dao.deleteAll(cid)
        } catch (error) {
            console.log(error);
        }
    }

    deleteCart = async(cid) => {
        try {
            return await this.dao.delete(cid)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    CartRepository
}