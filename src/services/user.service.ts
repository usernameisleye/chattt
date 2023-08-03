import User, { UserInterface } from "../model/user.model"
import error from "../utils/error"

class UserService {
    options = { password: 0, __v: 0 }
    check = (user: UserInterface) => {
        if(!user) throw new error("User does not exists")
    }

    async getUsers() {
        return await User.find({}, this.options)
    }

    async getUser(id: string) {
        const user = await User.findOne({ _id: id }, this.options)
        this.check(user)
        return user
    }

    async deleteUser(id: string) {
        const user = await User.findOneAndDelete({ _id: id })
        this.check(user)
        return user
    }

    async updateUser(id: string, data) {
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        )
        this.check(user)
        return user
    }
}

export default new UserService()