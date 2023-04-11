const fs = require("fs")

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

    addProductCart = async(idCart, datos) => {
        let cartID = await this.readCarts()
        let cartOld = await this.cartById(idCart)
        let cartIndex = cartID.findIndex(cart => cart.id == idCart)

   
        datos = {id : datos.id , quantity : 1}

        cartID[cartIndex] = {id : idCart ,products:[datos]}

            // cartID[cartIndex] = {...cartOld, products : [...cartOld.products, datos]}

        

        await fs.promises.writeFile(this.path, JSON.stringify(cartID, "null", 2), "utf-8")
    }
}

// const objeto = new cartManager()
// objeto.addProductCart(1,{ id:5})
// // // // objeto.addProductToCart()
// objeto.addProductToCart({id: 2, quantity: 1})
// // objeto.addProductToCart({title:"holis", price: "200"})
// objeto.createCart()
// objeto.readCarts()
//objeto.addProductToCart({id:5, quantity: 1})
// objeto.creatCart({title:"trol"})
module.exports = cartManager