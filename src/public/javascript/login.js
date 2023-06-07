console.log("Hola somos login");
const form = document.getElementById("formCookie")

form.addEventListener("submit" , (event) => {
    event.preventDefault()

    const data = new FormData(form)
    const objectUser = {}

    data.forEach((value , key) => objectUser[key] = value)

    fetch("/api/session/login", {
        headers : {
            "Content-Type": "application/json"
        },
        method : "POST", 
        body: JSON.stringify(objectUser)

    })
    .then(res => res.json()).then(res => localStorage.setItem("Codertoken", res.Accesstoken))
})
