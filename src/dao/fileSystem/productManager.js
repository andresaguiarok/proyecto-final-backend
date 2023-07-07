const fs = require("fs");
const listaDeAutos = []

class ProductManager {
    constructor (){
        this.products = listaDeAutos
        this.path = "./data.json"
    }
    
    create = async(product) => {
        const productsData = await this.get()
        let prodAdd = [...productsData,{_id: productsData.length+1, ...product}]

        await fs.promises.writeFile(this.path, JSON.stringify(prodAdd, "null", 2), "utf-8")
        return product
    };

    get = async () => {
        let productsList = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(productsList)
    };

    getBy = async(prod) => {
        const datos = await this.get()
        return datos.find(product => product._id == prod._id)
    }

    update = async (pid, updateBody) => {      
        const productsData = await this.get()
        let productOld = await this.getBy({_id: pid})
        let index = productsData.findIndex(auto => auto._id == pid)
        const productUpdate = {...productOld, ...updateBody}

        productsData[index] = productUpdate

        await fs.promises.writeFile(this.path, JSON.stringify(productsData, "null",2), "utf-8")
        return productUpdate
    }

    delete = async(pid) => {
        let productsData = await this.get()
        let productsFilter = productsData.filter(product => product._id != pid)

        await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, "null", 2))
        return "Removed product"
    }
}

module.exports = ProductManager;