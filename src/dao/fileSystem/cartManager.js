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
    
    createCart = async() => { 
        let newCart= [{id:this.cart.length+1, products:[]}]
        
        if (this.path.length > 1) { 
            const cartList = await this.getCarts()
            newCart = [...cartList,{id:cartList.length+1 , products:[]}]
        } 
        
        await fs.promises.writeFile(this.path, JSON.stringify(newCart, "null", 2), "utf-8")
        return 'cart created'
    } 
    
    getCarts = async () => {
        let listCart = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(listCart)
    }
    
    getCartByID = async(idCart) => {
        let carts = await this.getCarts()
        if(!carts) return
        return carts.find(cart => cart.id == idCart)
    }
    
    addProduct = async(cid, pid) => {
        const carts = await this.getCarts()     
        const cart = await this.getCartByID(cid)
        const productData = await pm.getProduct({ _id: pid })
        const index = carts.findIndex(cart => cart.id == cid)
        const productInCart = cart.products.find(prod => prod.id == pid)
        let product = {id: productData._id, title : productData.title , quantity: 1}

        cart.products == 0 
        ? carts[index] = {id: cart.id, products:[{...product}]}
        : carts[index] = {id: cart.id, products:[...cart.products,{...product}]}

        if(cart.products.some(prod => prod.id == pid)){
            carts[index] = {id : cart.id, products:[productInCart.quantity++]}
            carts[index] = {id: cart.id, products:[...cart.products]}   
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts,"null",2),"utf-8")
        return `The product ${productData.title} was added to the cart`
    }

    deleteProduct = async(cid, pid) => {
        const carts = await this.getCarts() 
        const cart = await this.getCartByID(cid)
        const index = carts.findIndex(cart => cart.id == cid)
        const product = cart.products.find(prod => prod.id == pid)
        const productDelete = cart.products.filter(prod => prod != product)

        if(cart.products.some(prod => prod.id == pid)){
            carts[index] = {id : cart.id, products:[...productDelete]}
            await fs.promises.writeFile(this.path, JSON.stringify(carts,"null",2),"utf-8")
            return `The product ${product.title} was removed from the cart`
        }
    }

    deleteAllProd = async(cid) => {
        const carts = await this.getCarts()     
        const cart = await this.getCartByID(cid)
        const index = carts.findIndex(cart => cart.id == cid)

        if(!carts[index]) return

        if(cart){
            carts[index] = {id: cart.id, products: []}
            await fs.promises.writeFile(this.path, JSON.stringify(carts,"null",2),"utf-8")
            return {id: cart.id , products: []}
        }
    }
}

module.exports = cartManager