const addProduct = async(id, cart) => {
    const response = await fetch(`http://localhost:8080/api/carts/${cart}/products/${id}`, {
        method: 'PUT'
    })

    let responseJson = await response.json()

    response.ok
    ? Swal.fire({ icon: 'success', title: responseJson.message, showConfirmButton: false, timer: 1500 })
    : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })
}
