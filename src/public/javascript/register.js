const formRegister = document.getElementById("formRegister")

formRegister.addEventListener("submit" , async(event) => {
    event.preventDefault()

    const data = new FormData(formRegister)
    const userRegister = {}

    data.forEach((value , key) => userRegister[key] = value)

    const response = await fetch("/api/session/register", {
        headers : {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userRegister)
    })

    const responseJson = await response.json()

    response.ok
    ? Swal.fire({
        icon: 'success',
        title: responseJson.message, 
        html: '<b>redirecting to the login page...</b>',
        showConfirmButton: false,
        timer: 1500 
    }) && setTimeout(() => { window.location.replace("/login") }, 2000)
    : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })
});
