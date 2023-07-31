import { Types } from "mongoose"
import { Response } from "express"
import { sign } from "jsonwebtoken"
import { tokenInfo } from "../config/env"

const { secret } = tokenInfo

const createJwt = (id: Types.ObjectId, res: Response) => {
    const token = sign({ id }, secret, { expiresIn: "1d" })

    let duration = new Date()
    duration.setDate(duration.getDate() + 7)
    res.cookie("tokkenn", token, 
    {
        path: "/",
        secure: false,
        httpOnly: true, 
        expires: duration,
        sameSite: "strict",
    })
}

export default createJwt