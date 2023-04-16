const socket = io()
console.log("socket")

socket.emit("message", "hola soy un cliente")

socket.on("event-all" , data =>{
    console.log(data);
})
