const fs = require("fs");
const usersArray = []

class UserManager {
    constructor (){
        this.users = usersArray
        this.path = "./dataUser.json"
    }
    
    createUser = async({firtsName, lastName, userName, email, birthDate, password}) => {
        let user = {firtsName, lastName, userName, email, birthDate, password}

        const usersList = await this.getUsers()
        let userAdd = [...usersList,{_id: usersList.length+1, ...user}]

        await fs.promises.writeFile(this.path, JSON.stringify(userAdd, "null", 2), "utf-8")
        return userAdd
        
    };

    getUsers = async () => {
        let usersData = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(usersData)
    };

    getUser = async(userData) => {
        const datos = await this.getUsers()
        return datos.find(user => user._id == userData._id)
    }

    updateUser = async (uid, updateBody) => {    
        const userData = await this.getUsers()
        let userOld = await this.getUser(uid)
        let index = userData.findIndex(user => user._id == uid._id)
        const userUpdate = {...userOld, ...updateBody}

        userData[index] = userUpdate

        await fs.promises.writeFile(this.path, JSON.stringify(userData, "null",2), "utf-8")
        return userUpdate

    }

    deleteUser = async(userDelete) => {
        let userData = await this.getUsers()
        let userFilter = userData.filter(user => user._id != userDelete._id)

        await fs.promises.writeFile(this.path, JSON.stringify(userFilter, "null", 2))
        return "Removed user"
    }
}

module.exports = UserManager;