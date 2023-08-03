import { Response } from "express"
import bcrypt from "bcrypt"
import error from "../utils/error"
import createJwt from "../utils/jwt"
import User from "../model/user.model"

class AuthService {
    async signup(data, res: Response) {
        const { email } = data
        let user = await User.findOne({ email })
        if(user) throw new error("Email already exists")

        user = await User.create(data)
        createJwt(user._id, res)

        const { profilePic, email: mail, role } = user
        return {
            profilePic,
            email: mail,
            role
        }
    }

    async signin(data, res: Response) {
        const { email, password } = data
        if(!email && !password) throw new error("All fields are required")

        const user = await User.findOne({ email })         
        if(user && (await bcrypt.compare(password, user.password))) {
            createJwt(user._id, res)

            const { profilePic, email: mail, role, pinned, archived } = user
            return {
                profilePic,
                email: mail,
                role,
                pinned,
                archived
            }
        } else throw new error("Invalid email or password")
    }

    async signout(res: Response) {
        res.cookie("tokkenn", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return "Successfully signed out"
    }
}

export default new AuthService()