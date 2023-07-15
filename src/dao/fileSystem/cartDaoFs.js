const fs = require("fs")
const ProductManager = require("../fileSystem/productManager")
const pm = new ProductManager()

class CartDaoFs{
    constructor(){
        this.path = "./cart.json"
        this.cart = []
    }
    
    create = async() => { 
        let newCart= [{id:this.cart.length+1, products:[]}]
        
        if (this.path.length > 1) { 
            const cartList = await this.get()
            newCart = [...cartList,{id:cartList.length+1 , products:[]}]
        } 
        
        await fs.promises.writeFile(this.path, JSON.stringify(newCart, "null", 2), "utf-8")
        return 'cart created'
    } 
    
    get = async () => {
        let listCart = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(listCart)
    }
    
    getCart = async(idCart) => {
        let carts = await this.get()
        if(!carts) return
        return carts.find(cart => cart.id == idCart)
    }
    
    addAndUpdate = async(cid, pid) => {
        const carts = await this.get()     
        const cart = await this.getCart(cid)
        const productData = await pm.getBy({ _id: pid })
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

    deleteOne = async(cid, pid) => {
        const carts = await this.get() 
        const cart = await this.getCart(cid)
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
        const carts = await this.get()     
        const cart = await this.getCart(cid)
        const index = carts.findIndex(cart => cart.id == cid)

        if(!carts[index]) return

        if(cart){
            carts[index] = {id: cart.id, products: []}
            await fs.promises.writeFile(this.path, JSON.stringify(carts,"null",2),"utf-8")
            return {id: cart.id , products: []}
        }
    }

    async delete(cid){
        let cartsData = await this.get()
        let cartRemove = cartsData.filter(cart => cart.id != cid)

        await fs.promises.writeFile(this.path, JSON.stringify(cartRemove, "null", 2))
        return "Removed cart"
    }
}

module.exports = CartDaoFs