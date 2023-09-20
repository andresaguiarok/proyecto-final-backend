# Proyecto Final Backend

Proyecto finalizado y deployado durante la cursada de backend en Coderhouse 2023.\
Este proyecto cuenta con la arquitectura MVC (Modelo-Vista-Controlador) que es un patrón de arquitectura/diseño que separa una aplicación en tres componentes lógicos principales Modelo, Vista y Controlador.

## Link del proyecto deployado

Este proyecto esta deployado en Render.com mediante este repositorio alojado en esta plataforma.\
LINK : https://backend-ecommerce-1haw.onrender.com/login

## Ejecucion de app

Si ejecutas **npm run dev** corre con nodemon.\
Si ejecutas **npm run start** corre con node.

## Para su uso
Es necesario installar `NODE.JS` & `NODEMON` de manera global\
Para el uso del repositorio debe instarlar todas las dependecias correspondientes ejecutando **npm i**.

## Api docs
Se puede probar diferentes endpoints tanto como :
 * Sesiones    : Registrarse y loggearse como usuario.
 * Productos   : Crear, leer , actualizar , eliminar un producto.
 * Cart        : Añadir o eliminar un producto, borrar todos los productos del carrito o crear un opcion de
      compra del carrito.
 * Usuarios    : buscar varios o un usuario y actualizar informacion de un usuario.

<img src="./src/public/images/api.docs.png">

## Uso del aplicativo

1 - Al ingresar por primera vez a la plataforma tendras que dirigirte a la ruta `/register` para poder registrarte como usuario.

2 - Una vez ya registrado te redirigira a la ruta `/login` , una vez ahi te logearas como usuario para poder acceder a la home page.

3 - Una vez en la home page podras ver tu nombre de usuario , tu rol y tambien contaras con un boton para ir a tu carrito de compras.

4 - En la home page tendras un listados de productos que podras observar detalles del producto , contara con un boton para añadir a tu carrito.

5 - En tu carrito tendras tres botones , uno para eliminar un producto del carrito especifico , uno para borrar todos los productos del carrito y uno para generar la orden/ticket de compra.

6 - Esta app cuenta con algunas rutas limitadas para diferentes tipo de jerarquias de usuarios :
 * user     : usuario comun.
 * premium  : usuario con algunos privilegios.
 * admin    : administrador/es de la app.

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenV4MTdqMTc3ZDNyYnZ1YzBraGNsbjJlMmttc2NsOWd1enp5aXYxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UDqlL5CBlMV4X93vnS/giphy.gif">