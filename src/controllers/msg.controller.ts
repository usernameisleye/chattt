import { Request, Response } from "express"
import response from "../utils/response"
import MessageService from "../services/msg.service"

class MessageController {
    async getMessages(req: Request, res: Response) {
        const r = await MessageService.getMessages()
        res.status(200).json(response.success("Success", r))
    }

    async sendMessage(req: Request, res: Response) {
        const r = await MessageService.sendMessage(req.body)
        res.status(201).json(response.success("Message sent", r))
    }
    
    async updateMessage(req: Request, res: Response) {
        const r = await MessageService.updateMessage(req.params.id, req.body)
        res.status(200).json(response.success("Message updated", r))
    }

    async deleteMesssage(req: Request, res: Response) {
        const r = await MessageService.deleteMessage(req.params.id)
        res.status(200).json(response.success("Message deleted", r))
    }
}

export default new MessageController()