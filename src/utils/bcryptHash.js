const bcrypt = require("bcrypt")

//Crea un password hasheado
exports.creaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Valida el password hasheado
exports.validPassword = (password, user) => bcrypt.compareSync(password, user.password)