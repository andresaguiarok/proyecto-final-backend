const multer = require("multer")
const path = require("node:path")

const storage = multer.diskStorage({
    destination: function(req, file , callback) {
        switch (file.fieldname) {
            case 'identity'  : 
            case 'myAddress' :
            case 'myAccount' :
                callback(null, `${path.dirname(__dirname)}/public/uploads/documents`)
                break;
            case 'product'   :
                callback(null, `${path.dirname(__dirname)}/public/uploads/products`)
                break;                 
            case 'profile'   :
                callback(null, `${path.dirname(__dirname)}/public/uploads/profiles`)
                break;        
            default:
                break;
        }
    },
    filename: function(req, file , callback) {
        callback(null, `${file.fieldname} - ${Date.now()} - ${file.originalname}`)
    }
})

const uploader = multer({
    storage,
    onError: function(err, next) {
        console.log(err);
        next()
    }
})

module.exports = {
    uploader
}