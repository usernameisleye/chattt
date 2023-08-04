import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import error from "../utils/error"
import { tokenInfo } from "../config/env"
import User, { UserInterface } from "../model/user.model"

interface CustomRequest extends Request {
    user: UserInterface
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { secret } = tokenInfo

    const token = req.cookies.tokkenn
    if(!token) throw new error("Unauthorized access: Token not found", 401)

    try {
        const decoded = jwt.verify(token, secret)

        let user: UserInterface
        if(typeof decoded !== "string") {
            user = await User.findById(decoded.id)
        }
        if(!user) throw new error("Unauthorized access: User does not exists", 401)
        req.user = user
    }
    catch(error) {
        throw new error("Unauthorized access: Invalid token", 401)
    }

    next()
}

export default auth