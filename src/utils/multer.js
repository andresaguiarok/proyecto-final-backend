const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file , callback) {
        callback(null, `/static/uploads`)
    },
    filename: function(req, file , callback) {
        console.log("file:", file);
        callback(null, `${Date.now()} - ${file.originalname}`)
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