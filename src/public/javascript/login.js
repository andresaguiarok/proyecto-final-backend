const formLogin = document.getElementById("formLogin")

formLogin.addEventListener("submit" , async(event) => {
    event.preventDefault()

    const data = new FormData(formLogin)
    const userLogin = {}

    data.forEach((value , key) => userLogin[key] = value)

    const response = await fetch("/api/session/login", {
        headers : {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userLogin)
    })

    const responseJson = await response.json()
     
    response.ok
    ? Swal.fire({
        icon: 'success',
        title: responseJson.message, 
        html: '<b>redirecting to the home page...</b>',
        showConfirmButton: false,
        timer: 1500 
    })&& setTimeout(() => { window.location.replace("/api/products") }, 2000)
    : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })
});