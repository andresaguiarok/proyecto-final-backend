const deleteProduct = async(product, cart) => {
    const response = await fetch(`/api/carts/${cart}/products/${product}`, {
        method: 'DELETE'
    })

    const responseJson = await response.json()

    response.ok
    ? Swal.fire({ icon: 'success', title: responseJson.message, showConfirmButton: false, timer: 1500 })
        && setTimeout(() => { location.reload() }, 2000)
    : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })
}

const deteleAll = async(id) => {
    const response = await fetch(`/api/carts/${id}`, {
        method: 'DELETE'
    })

    const responseJson = await response.json()

    response.ok
    ? Swal.fire({ icon: 'success', title: responseJson.message, showConfirmButton: false, timer: 1500 })
        && setTimeout(() => { location.reload() }, 2000)
    : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })
}

const purchase = async(id) => {
    const response = await fetch(`/api/carts/${id}/purchase`, {
        method: 'POST'
    })

    const responseJson = await response.json()
    const ticket = responseJson.toTicket

    response.ok
    ? Swal.fire({
        title: responseJson.message,
        icon: 'success',
        html:`            
            <div>
                <b>date of purchase : ${ticket.purchaseDatetime} </b>
                <b>amount: ${ticket.amount} </b>
            </div>`,
        showCloseButton: true,
        showCancelButton: true,
      })
        && setTimeout(() => { location.reload() }, 2000)
    : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })
}