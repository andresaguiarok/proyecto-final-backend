const fs = require("fs");
const listaDeAutos = []

class ProductManager {
    constructor (){
        this.products = listaDeAutos
        this.path = "./proyecto/data.json"
    }
    
    addProduct = async(title, description, price, thumbnail, code, stock) => {
        let nuevoAuto = {id: this.products.length+1, title, description, price, thumbnail, code, stock}

        if(nuevoAuto.title === '' || nuevoAuto.description === '' || 
           nuevoAuto.price === '' || nuevoAuto.thumbnail === '' ||
           nuevoAuto.code === '' || nuevoAuto.stock === '') return 'Complete los campos correctamente'
    
        let auto = this.products.find(auto => auto.code == code)
        if (auto) return  "El auto con este code ya fue ingresado"

        this.products.push(nuevoAuto)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products, "null", 2), "utf-8")
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
        
        if (!autoEncontrado) return "Este Producto no existe"
        return autoEncontrado
    }

    updateProduct = async (autoId, datosNuevos) => {       
        let datosDesactualizados = await this.readProducts()
        let autoActualizar = await this.getProductById(autoId)
        let actualizarAuto = datosDesactualizados.filter(auto => auto.id != autoId)

        let datosActualizados = [...actualizarAuto,{...autoActualizar, ...datosNuevos}]


        await fs.promises.writeFile(this.path, JSON.stringify(datosActualizados, "null",2), "utf-8")
        return "Producto actualizado"
        //node ./Desafios/manejoDeArchivos.js
    }

    deleteProduct = async(autoId) => {
        let traerDatos = await this.readProducts()
        let autosFiltrados = traerDatos.filter(auto => auto.id != autoId)

        await fs.promises.writeFile(this.path, JSON.stringify(autosFiltrados, "null", 2))
        return "Producto eliminado"
    }
}

module.exports = ProductManager;