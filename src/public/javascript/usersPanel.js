let timerInterval

async function deleteUserId(id, fullName){
  const deleteById = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: 'DELETE'
  })

  let response = await deleteById.json()

  if(deleteById.ok){
    Swal.fire({
      title: `Deleting user data ${fullName}`,
      html: 'The data will be deleted in <b></b> milliseconds.',
      timer: 2500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${response.status}, the user is deleted`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    setTimeout(() => {
      location.reload()
    }, 3500)
  }else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: response.message,
    })
  }
}

function deleteUser(id , fullName){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
      
  swalWithBootstrapButtons.fire({
    title: `Are you sure you want to delete user ${fullName}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUserId(id, fullName)
    } else if ( result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        `the user ${fullName} will not be deleted`,
        'error'
      )
    } 
  })
};

document.addEventListener("DOMContentLoaded", function() {
  // Obtener todos los botones de enviar
  const deleteButtons = document.querySelectorAll(".btnDelete");

  // Agregar un evento de clic a cada botón de enviar
  deleteButtons.forEach(function(button) {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // Obtener la data del usuario
      const id          = button.getAttribute("data-parameter")
      const fullName    = button.getAttribute("data-fullname")

      // Paso los parametros necesarios a la funcion deleteUser
      deleteUser(id, fullName)
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Obtener todos los botones de enviar
  const sendButtons = document.querySelectorAll(".btnUpdate");

  // Agregar un evento de clic a cada botón de enviar
  sendButtons.forEach(function(button) {
    button.addEventListener("click", async(e) => {
      e.preventDefault()
      // Obtener el formulario al que pertenece el botón actual
      const formulario = button.closest("form")

      // Obtener los valores de los inputs dentro del formulario
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      const id    = button.getAttribute("data-parameter");
      const email = formulario.querySelector('input[name="email"]').value
      const role  = formulario.querySelector('input[name="role"]').value

      //Se muestra un texto a modo de ejemplo, luego va a ser un icono
      if (!emailRegex.test(email)) return Swal.fire({
        icon: 'error',
        title: 'the email entered is not valid',
        text: 'try again!',
      })

      
      // Metodo PUT para actualizar el usuario por ID y muestra una respuesta
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers : { "Content-Type": "application/json" },
        body: JSON.stringify({email, role})
      })

      const responseJson = await response.json()
    
      response.ok
      ? Swal.fire({ icon: 'success', title: responseJson.status, showConfirmButton: false, timer: 1500 })
        && setTimeout(() => { location.reload() }, 2000)
      : Swal.fire({ icon: 'error', title: responseJson.status, text: responseJson.message })

    });
  });
});