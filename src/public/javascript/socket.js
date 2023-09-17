const socket = io()

socket.on("products" , data =>{

    let article = document.getElementById("listProducts")
    let products = ""
    data.forEach(product => {
        products += `<div class="card" style="width: 18rem; margin: 10px">
                        <img src=${product.thumbnails} class="card-img-top" style="height: 11rem;">
                        <div class="card-body">
                            <h5 class="card-title">${product.title} </h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">description : ${product.description} </li>
                            <li class="list-group-item">price : ${product.price} u$d</li>
                            <li class="list-group-item">stock : ${product.stock} </li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div> `
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

        title ===""|| description ==="" || price ==="" || thumbnails ==="" || code ==="" || stock ===""
        ? Swal.fire({ icon: 'error', title: "error", text: "It is mandatory to complete all fields." })
        : socket.emit("addProduct", {title, description, price, thumbnails, code, stock})
            && Swal.fire({ icon: 'success', title: "success", text: "the product has been created successfully" })
    })
})

