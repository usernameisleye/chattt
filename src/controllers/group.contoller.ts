import { Request, Response } from "express"
import response from "../utils/response"
import GroupService from "../services/group.service"

class GroupController {
    async getGroups(req: Request, res: Response) {
        const r = await GroupService.getGroups()
        res.status(200).json(response.success("Success", r))
    }

    async getGroup(req: Request, res: Response) {
        const r = await GroupService.getGroup(req.params.id)
        res.status(200).json(response.success("Success", r))
    }

    async createGroup(req: Request, res: Response) {
        const r = await GroupService.createGroup(req.body)
        res.status(201).json(response.success("Group created", r))
    }
    
    async joinGroup(req: Request, res: Response) {
        const r = await GroupService.joinGroup(req.params.groupID, req.params.userID)
        res.status(200).json(response.success("Joined group", r))
    }

    async deleteGroup(req: Request, res: Response) {
        const r = await GroupService.deleteGroup(req.params.id)
        res.status(200).json(response.success("Group deleted", r))
    }

    async updateGroup(req: Request, res: Response) {
        const r = await GroupService.updateGroup(req.params.id, req.body)
        res.status(200).json(response.success("Group updated", r))
    }

    async getMembers(req: Request, res: Response) {
        const r = await GroupService.getMembers(req.params.groupID)
        res.status(200).json(response.success("Success", r))
    }

    async getMember(req: Request, res: Response) {
        const r = await GroupService.getMember(req.params.groupID, req.params.userID)
        res.status(200).json(response.success("Success", r))
    }

    async removeMember(req: Request, res: Response) {
        const r = await GroupService.removeMember(req.params.groupID, req.params.userID)
        res.status(200).json(response.success("Member removed", r))
    }
}

export default new GroupController()