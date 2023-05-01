const socket = io()

socket.on("products" , data =>{

    let article = document.getElementById("listProducts")
    let products = ""
    data.forEach(product => {
        products += `<div class="card" style="width: 18rem; padding: 16px; margin: 20px">
                        <h2 class="card-title">
                            ${product.title} 
                        </h2>
                        <img src= ${product.thumbnails} class="card-img-top" style="width: 18rem; height: 12rem" alt=${this.title} />
                        <h4 class="card-text">
                            Price: ${product.price} usd 
                        </h4>
                        <div class="boxItem">
                            <a class="icon-link" style="color:blue" href="">Ver mas...</a>
                            <button id="boton" class="btnDelete"> Delete </button>
                        </div>
                    </div>`
    });  
    article.innerHTML = products

    let form = document.querySelector("#formData")
    form.addEventListener("submit", event => {
        event.preventDefault()

        let title = form.elements.title.value;
        let description = form.elements.description.value;
        let price = form.elements.price.value;
        let thumbnails = form.elements.thumbnails.value;
        let code = form.elements.code.value;
        let stock = form.elements.stock.value;

        if(title ===""|| description ==="" || price ==="" || 
        thumbnails ==="" || code ==="" || stock ==="")return console.log({status: "Error", mensaje: "Es obligatorio completar todos los campos"})

        socket.emit("addProduct", {title, description, price, thumbnails, code, stock})
    })
})

