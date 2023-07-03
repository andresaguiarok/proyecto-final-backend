const fs = require("fs");
const listaDeAutos = []

class ProductManager {
    constructor (){
        this.products = listaDeAutos
        this.path = "./data.json"
    }
    
    addProduct = async(title, description, price, thumbnails, code, stock) => {
        let product = {title, description,price, thumbnails, code, stock}
        const productsData = await this.getProducts()

        let prodAdd = [...productsData,{_id: productsData.length+1, ...product}]
        await fs.promises.writeFile(this.path, JSON.stringify(prodAdd, "null", 2), "utf-8")
        return product
    };

    getProducts = async () => {
        let listaDeAutos = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(listaDeAutos)
    };

    getProduct = async(prod) => {
        const datos = await this.getProducts()
        return datos.find(product => product._id == prod._id)
    }

    updateProduct = async (pid, updateBody) => {      
        const productsData = await this.getProducts()
        let productOld = await this.getProduct({_id: pid})
        let index = productsData.findIndex(auto => auto._id == pid)
        const productUpdate = {...productOld, ...updateBody}

        productsData[index] = productUpdate

        await fs.promises.writeFile(this.path, JSON.stringify(productsData, "null",2), "utf-8")
        return productUpdate
    }

    deleteProduct = async(pid) => {
        let productsData = await this.getProducts()
        let productsFilter = productsData.filter(product => product._id != pid)

        await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, "null", 2))
        return "Removed product"
    }
}

module.exports = ProductManager;