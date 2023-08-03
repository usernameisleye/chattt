import { Request, Response } from "express"
import response from "../utils/response"
import UserService from "../services/user.service"

class UserContoller {
    async getUsers(req: Request, res: Response) {
        const r = await UserService.getUsers()
        res.status(200).json(response.success("Success", r))
    }

    async getUser(req: Request, res: Response) {
        const r = await UserService.getUser(req.params.id)
        res.status(200).json(response.success("Success", r))
    }
    
    async deleteUser(req: Request, res: Response) {
        const r = await UserService.deleteUser(req.params.id)
        res.status(200).json(response.success("User deleted", r))
    }

    async updateUser(req: Request, res: Response) {
        const r = await UserService.updateUser(req.params.id, req.body)
        res.status(200).json(response.success("User updated", r))
    }
}

export default new UserContoller()