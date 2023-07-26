class ProductsRespository {
    constructor(dao){
        this.dao = dao
    }

    getProducts = async(data) => {
        try {
            return await this.dao.get(data)
        } catch (error) {
            console.log(eorr);
        }
    }

    getProduct = async(product) => {
        try {
            return await this.dao.getBy(product)
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async(title, description, price, thumbnails, code, stock, owener) => {
        try {
            return await this.dao.create({title, description, price, thumbnails, code, stock, owener});
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async(id , updateBody) => {
        try {
            return await this.dao.update(id, updateBody)
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (pid) => {
        try {
            return await this.dao.delete(pid)
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = {
    ProductsRespository
}