class ViewsController {
    loginView = (req,res)=> {
        res.render("login" , {title : "Log In", style: "login.css"})
    }

    registerView = (req,res)=> {
        res.render("register" , {title : "Register", style: "register.css"})
    }

    realTimeProductsView = (req, res) =>{
        res.render("realTimeProducts", { title: "RealTimeProducts", style: "index.css"})
    }

    chatView = (req, res) => {
        res.render("chat", {title: "Chat",  style: "chat.css"})
    }

    recoverPassword = (req, res) => {
        res.render("recoverPass", { title: "Recover password", style: "login.css" })
    }

    changePassword = (req,res) => {
        res.render("changePassword", {title: "Change of Password", style: "register.css"})
    }

    userDocuments = (req,res) => {
        res.render("userDocument", {title: "User Document", style: "uploadDocuments.css"})
    }
}

module.exports = ViewsController