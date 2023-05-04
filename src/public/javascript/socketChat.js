const socket = io()

let user

Swal.fire({
    title: "Identification",
    input : "text",
    text: "Ingresar tu user",
    inputValidator: (value) => {
        return !value && "Necesitas un nombre de usuario"
    },
    allowOutsideClick : false
}).then(result => {
    user = result.value
    socket.emit("autentification", user)
})

const inputMessage = document.getElementById("text")

inputMessage.addEventListener("keyup", event => {
    if (event.key === "Enter"){
        if (inputMessage.value== "") return
        socket.emit("message", {user , message: inputMessage.value})
        inputMessage.value = ""
    } 
})

socket.on("messageLogs", data => {
    const log = document.getElementById("messages")
    let messages =""

    data.forEach(({user, message}) => {
        messages += `<li> ${user} message: ${message} </li>` 
    })

    log.innerHTML = messages
})

socket.on("newUserConect", user => {
    if(!user){
        return
    } 

    Swal.fire({
        toast: true,
        position : "top-right",
        showConfirmButton : false,
        timer: 8000,
        title: `${user} online`,
        icon: "success"
    })
})
