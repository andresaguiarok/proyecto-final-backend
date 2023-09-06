let timerInterval

const deleteUser = (id , firtsName, lastName) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
      title: `Are you sure you want to delete user ${firtsName} ${lastName}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json().then(res => console.log(res)))
            .then(
                Swal.fire({
                    title: `Deleting user data ${firtsName} ${lastName}`,
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
                      clearInterval(timerInterval)
                    }
                })
            )
          .catch(e => console.log(e))
          .finally(setTimeout(() => {
                location.reload()
          }, 3500))
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                `the user ${firtsName} ${lastName} will not be deleted`,
                'error'
            )
        } 
    })
};
