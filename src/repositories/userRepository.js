class UserRepository{
    constructor(dao){
        this.dao = dao
    }

    createUser = async(newUser) => {
        try {
            return await this.dao.create(newUser)
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async(data) => {
        try {
            return await this.dao.getByUser(data)
        } catch (error) {
            console.log(error);
        }
    }

    getUsers = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            console.log(error);
        }
    }

    updateUser = async(uid, updateData) => {
        try {
            return await this.dao.update(uid, updateData)
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async(uid) => {
        try {
            return await this.dao.delete(uid)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    UserRepository
}