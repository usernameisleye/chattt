import User from "../model/user.model"
import error from "../utils/error"

class UserService {
    options = { password: 0, __v: 0 }
    async getUsers() {
        return await User.find({}, this.options)
    }

    async getUser(id: number) {
        const user = await User.findOne({ _id: id }, this.options)
        if(!user) throw new error("User does not exist")
        return user
    }

    async deleteUser(id: number) {
        const user = await User.findOneAndDelete({ _id: id })
        if(!user) throw new error("User does not exist")
        return user
    }

    async updateUser(id: number, data) {
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        )
        if(!user) throw new error("User does not exist")
        return user
    }
}

export default new UserService()