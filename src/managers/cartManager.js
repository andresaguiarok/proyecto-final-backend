const fs = require("fs")

class cartManager{
    constructor(){
        this.path = "./cart.json"
        this.cart = []
    }

    addProductToCart = async(product) => {
        
        let productToCart = {id:this.cart.length+1 , product}


        this.cart.push(productToCart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.cart, "null", 2), "utf-8")
    } 

    readCart = async () => {
        let listCart = await fs.promises.readFile(this.path)
        console.log(listCart);
    }
}

const objeto = new cartManager()

// objeto.addProductToCart({title:"hola", price: "400"})
// objeto.addProductToCart({title:"holis", price: "200"})
// objeto.addProductToCart({title:"holes", price: "600"})

module.exports = cartManager