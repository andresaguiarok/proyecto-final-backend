const fs = require("fs")
const ProductManager = require("../fileSystem/productManager")

const pm = new ProductManager()

class cartManager{
    constructor(){
        this.path = "./cart.json"
        this.cart = []
    }
    
    createArray = async() => {
        await fs.promises.writeFile(this.path, JSON.stringify([]))
    }
    
    newCart = async() => { 
        let productCart= [{id:this.cart.length+1, product:[]}]
        
        if (this.path.length > 1) { 
            let productList = await this.readCarts()
            productCart = [...productList,{id:productList.length+1 , product:[]}]
        } 
        
        await fs.promises.writeFile(this.path, JSON.stringify(productCart, "null", 2), "utf-8") 
    } 
    
    readCarts = async () => {
        let listCart = await fs.promises.readFile(this.path, "utf-8")
        let cartList = JSON.parse(listCart)
        return cartList
    }
    
    cartById = async(idCart) => {
        let carts = await this.readCarts()
        let cartId = carts.find(cart => cart.id == idCart)
        if (!cartId) return
        return cartId
    }
    
    addProductCart = async(cdi, pid) => {
        let carts = await this.readCarts()     
        let cartByID = await this.cartById(cdi)
        let productById = await pm.getProductById(pid)
        
        let cartIndex = carts.findIndex(cart => cart.id == cdi)
        let product = {id: productById.id, title : productById.title , quantity: 1}

        carts[cartIndex] = {id: cartByID.id, products:[{...product}]}
        carts[cartIndex] = {id: cartByID.id, products:[...cartByID.products,{...product}]}
         
        if (cartByID.products.some(prod => prod.id == pid)){
            let productInCart = cartByID.products.find(prod => prod.id == pid)
            productInCart.quantity++;
            
            carts[cartIndex] = {id : cartByID.id, products:[productInCart]}
            carts[cartIndex] = {id: cartByID.id, products:[...cartByID.products]}   
            await fs.promises.writeFile(this.path, JSON.stringify(carts,"null",2),"utf-8")
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(carts,"null",2),"utf-8")
    }
}

module.exports = cartManager