const fs = require("fs");
const listaDeAutos = []

class ProductManager {
    constructor (){
        this.products = listaDeAutos
        this.path = "./data.json"
    }
    
    addProduct = async(title, description, price, thumbnails, code, stock) => {
        let busquedaDeCode = await this.readProducts()
        
        let nuevoAuto = {...title, ...description, ...price, ...thumbnails, ...code, ...stock}
        
        //Validacion si los campos existen o estan vacios
        if(!nuevoAuto.title || !nuevoAuto.description || !nuevoAuto.price || 
           !nuevoAuto.thumbnails || !nuevoAuto.code || !nuevoAuto.stock) return 

        //Validacion si el code del producto existe
        let codeExiste = busquedaDeCode.find(auto => auto.code === nuevoAuto.code)
        if (codeExiste) return

        let autoAgregado = [...busquedaDeCode,{id: busquedaDeCode.length+1, ...nuevoAuto}]

        await fs.promises.writeFile(this.path, JSON.stringify(autoAgregado, "null", 2), "utf-8")
    };

    readProducts = async () => {
        let listaDeAutos = await fs.promises.readFile(this.path, "utf-8")
        const autos = JSON.parse(listaDeAutos)
        return autos
    };

    getProducts = async() => {
        let mostrarAutos = await this.readProducts()
        return mostrarAutos
    };

    getProductById = async(autoId) => {
        let buscarId = await this.readProducts()
        let autoEncontrado = buscarId.find(auto => auto.id == autoId)
        if (!autoEncontrado) return "No existe este producto"
        return autoEncontrado
    }

    updateProduct = async (autoId, datosNuevos) => {       
        let datosDeProductos = await this.readProducts()
        let actualizarProducto = await this.getProductById(autoId)
        let index = datosDeProductos.findIndex(auto => auto.id == autoId)

        datosDeProductos[index] = {...actualizarProducto, ...datosNuevos}

        await fs.promises.writeFile(this.path, JSON.stringify(datosDeProductos, "null",2), "utf-8")
        return 
    }

    deleteProduct = async(autoId) => {
        let traerDatos = await this.readProducts()
        let autosFiltrados = traerDatos.filter(auto => auto.id != autoId)

        await fs.promises.writeFile(this.path, JSON.stringify(autosFiltrados, "null", 2))
        return "Producto eliminado"
    }
}

module.exports = ProductManager;