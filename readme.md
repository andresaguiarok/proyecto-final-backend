# Proyecto Backend

Es un proyecto que se esta realizando este año en la cursada de backend en Coderhouse.\
Este proyecto cuenta con la arquitectura MVC (Modelo-Vista-Controlador) que es un patrón de arquitectura/diseño que separa una aplicación en tres componentes lógicos principales Modelo, Vista y Controlador.

## Ejecucion de app

Si ejecutas **npm run dev** corre con nodemon.\
Si ejecutas **npm run start** corre con node.

## Para su uso
Es necesario installar `NODE.JS` & `NODEMON`\
Para el uso del repositorio debe instarlar las siguientes dependencias :

## 1 - `Express`
El proyecto esta programado en este framework backend web transigente, escrito en JavaScript y alojado dentro del entorno de ejecución Node.JS

## 2 - `Express-handlebars`
Es un sistema de plantillas Javascript basado en Mustache Templates. Mantiene separados el código y la vista. Permite generar HTML a partir de objetos con datos en formato JSON.\
Cuenta con su propia carpeta que esta asignada como "views."

## 3 - `socket.io`
El servidor socket.io (basado en Node. js) hace de intermediario entre el iframe y el navegador, de forma que cuando el iframe manda un mensaje en el chat notificará al servidor socket.io, y éste a su vez notificará al navegador para que refresque la página y muestre el mensaje del chat.\
Su archivo es "chat.handlebars" y se encuentra en la carpeta "views"

## 4 - `bcrypt`
Bcrypt es una función de hash de contraseñas y derivación de claves para contraseñas basada en el cifrado Blowfish.\
Su archivo es "bcryptHash" y se encuentra en la carpeta "utils"

## 5 - `commander`
Commander se ocupa de analizar los argumentos en opciones y argumentos de comando, muestra los errores de uso para los problemas e implementa un sistema de ayuda.\
Se utiliza en combinacion con las variables de entorno para definir en que entorno vamos a desarrollar.\
Su archivo es "commander.js" y se encuentra en la carpeta "utils" 

## 6 - `connect-mongo`
Nuestra configuración de session require este modulo para sabes cuando el usuario inicia su session.\
Se encuentra inicializado en `APP.JS`

## 7 - `cookie-parser`
Cookie-parser analiza el encabezado Cookie y rellena req.cookies con objeto marcado con los nombres de las cookies.\
Se encuentra inicializado en `APP.JS` y trabaja en conjunto con el archivo "jsonWebToken.js" que se encuentrsa en la carpeta "utils" &
con el archivo "passportJWT.js" que se encuentra en la capera "passportJwt" 

## 8 - `cors`
Intercambio de Recursos de Origen Cruzado (CORS) es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el navegador.\
Se encuentra inicializado en `APP.JS`

## 9 - `dotenv`
Se require dotenv para manejar las variables de entorno con las que se desarrolla.\
Se encuentra en ".env" , ".env.development" & ".env.production"

## 10 - `express-session`
El middleware express-session almacena los datos de sesión en el servidor.\
Se encuentra inicializado en `APP.JS`

## 11 - `jsonwebtoken`
JSON Web Token (JWT) es un estándar para transmitir información de forma segura en internet, por medio de archivos en formato JSON.\
Su archivo "jsonWebToken.js" que se encuentra en la carpeta "utils" 

## 12 - `mongoose`
Mongoose es una biblioteca de modelado de datos orientada a objetos (ODM) para MongoDB y Node. js. Administra las relaciones entre los datos, proporciona validación de esquemas y se utiliza para traducir entre objetos en el código y la representación de esos objetos en MongoDB.\
Los archivos con los que se desarrollan se encuentran en las carpetas " dao > models > " y son los siguientes:\
*1 - cartModel.js\
*2 - messageModel.js\
*3 - productModel.js\
*4 - ticketModel.js\
*5 - userModel.js

## 13 - `mongoose-paginate-v2`
mongoose-paginate-v2 es una biblioteca de paginación que tiene un contenedor de página. El uso principal del complemento es que puede modificar las claves de valor de retorno directamente en la consulta misma para que no necesite ningún código adicional para la transformación.\
Trabaja en conjunto con el archivo "productModel.js" que se encuentra en la carpetas " dao > models > "

## 14 - `nodemailer`
Es un paquete de distribución de Node. js que podemos integrar a nuestro proyecto y nos permite enviar email a un servidor SMTP en formato texto o HTML.\
Se desarrolla con variables de entorno que se encuentan en ".env.development" & ".env.production".\
Cuenta con su propio archivo "nodeMailer.js" que se encuentra en la carpeta "utils".\
Y trabaja en conjunto con el archivo "cartsController.js" que se ecuentra en la carpeta "controllers".

## 15 - `passport`
Passport es un middleware de autenticación para Node.js. Extremadamente flexible y modular, Passport se puede colocar discretamente en cualquier aplicación web basada en Express.\
Trabaja en conjunto con varios archivos , los siguientes son:\
1 - con varibles de entorno en el archivo ".env"\
2 - en `APP.JS` inicializa varias funciones.\
3 - en "passportConfig.js" se usa para crear una nueva estrategia de git-hub y se encuentra en la carpeta "config"\
4 - en "passportCall" se utiliza el metodo authenticate y se encuentra en la carpeta "passportJwt"\
5 - en "passportJwt" se utiliza para crear una nueva estrategia y extraer las cookies y se encuentra en la carpeta "passportJwt"\
6 - en las siguientes rutas: "cartRouterMongo.js" , "productsRouterMongo.js" , "sessionRouter.js" , "ticketRouter.js" , "userRouter.js" y "viewsRouter.js" se utilizan para validar el metodo que se utiliza "passportCall" y autoriza dependiendo el role que tenga el usuario

## 16 - `passport-github2`
Estrategia de passport para autenticarse con GitHub usando la API OAuth 2.0.\
Este módulo le permite autenticarse usando GitHub en sus aplicaciones Node.js. Al conectarse a Passport, la autenticación de GitHub se puede integrar de manera fácil y discreta en cualquier aplicación o marco que admita el middleware de estilo Connect , incluido Express.\
Su archivo es "passportConfig" que se encuentra en la carpeta "config"

## 17 - `passport-jwt`
Nos permite crear middleware passport con estrategia de tipo jwt, que permitirá recibir un token vía cabecera y hacer su validación\
Su archivo es "passportJwt.js" que se encuentra en la carpeta "passportJwt"\
Su funcion se declara en `APP.JS`\

## 18 - `twilio`
Es una de las principales plataformas de comunicación en la nube que permite atraer clientes a través de los distintos canales: SMS, voz, video, correo electrónico, WhatsApp y más. Las API de pago por uso permiten a las empresas escalar las comunicaciones de manera fiable.\
Trabaja en conjunto con varios archivos , los siguientes son:\
1 - con variables de entorno que se encuentran en los archivos ".env.development" & ".env.production"\
2 - su archivo es "twilioMessage.js" que se encuentra en la carpeta "utils"\
3 - trabaja en conjunto con el archivo "userController.js" que se encuentra en la carpeta "controllers"

## 19 - `uuid`
Un UUID es un identificador único universal que se genera utilizando números aleatorios.
Se encuentran en archivos como :\
1 - Su archivo es "productsController.js" que se encuentra en la carpeta "controllers"\
2 - Su archivo es "cartsController.js" que se encuentra en la carpeta "controllers"