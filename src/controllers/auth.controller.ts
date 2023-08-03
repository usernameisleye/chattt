import { Request, Response } from "express"
import response from "../utils/response"
import AuthService from "../services/auth.service"

class AuthController {
    async signup(req: Request, res: Response) {
        const r = await AuthService.signup(req.body, res)
        res.status(201).json(response.success("User signed up", r))
    }

    async signin(req: Request, res: Response) {
        const r = await AuthService.signin(req.body, res)
        res.status(200).json(response.success("User signed in", r))
    }
    
    async signout(req: Request, res: Response) {
        const r = await AuthService.signout(res)
        res.status(200).json(response.success("User signed out", r))
    }
}

export default new AuthController()