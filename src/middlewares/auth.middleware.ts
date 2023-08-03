import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import error from "../utils/error"
import { tokenInfo } from "../config/env"
import User, { UserInterface } from "../model/user.model"

const auth = () => {
    const { secret } = tokenInfo

    interface CustomRequest extends Request {
        user: UserInterface
    }

    return async function (req: CustomRequest, res: Response, next: NextFunction) {
        if(!req.headers.authorization) throw new error ("Unauthorized access: Token not found", 401)

        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, secret)

        let user: UserInterface
        if (typeof decoded !== "string") {
            const id = decoded.id
            user = await User.findById(id)
        }
        if(!user) throw new error("Unauthorized access: User does not exists", 401)

        req.user = user
        next()
    }
}

export default auth