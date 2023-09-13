const { logger } = require("../utils/logger.js");

class UserRepository{
    constructor(dao){
        this.dao = dao
    }

    createUser = async(newUser) => {
        try {
            return await this.dao.create(newUser)
        } catch (error) {
            logger.error(error)
        }
    }

    getUser = async(data) => {
        try {
            return await this.dao.getByUser(data)
        } catch (error) {
            logger.error(error)
        }
    }

    getUsers = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            logger.error(error)
        }
    }

    updateUser = async(uid, updateData) => {
        try {
            return await this.dao.update(uid, updateData)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteUser = async(uid) => {
        try {
            return await this.dao.delete(uid)
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = {
    UserRepository
}