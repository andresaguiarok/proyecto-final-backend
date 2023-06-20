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
}

module.exports = ViewsController