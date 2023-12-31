import Group, { GroupInterface } from "../model/group.model"
import User, { UserInterface } from "../model/user.model"
import Message from "../model/msg.model"
import error from "../utils/error"

class GroupService {
    checkGrp = (grp: GroupInterface) => {
        if(!grp) throw new error("Group does not exists")
    }

    checkMember = (member: UserInterface) => {
        if(!member) throw new error(`${member.name} is not a member of this group`)
    }

    async getGroups() {
        return await Group.find({}).sort({ createdAt: -1 })
    }

    async getGroup(id: string) {
        const grp = await Group.findById(id)
        this.checkGrp(grp)
        return grp
    }

    async createGroup(data) {
        return await Group.create(data)
    }
    
    async joinGroup(groupID: string, userID) {
        const grp = await Group.findById(groupID)
        this.checkGrp(grp)
        if(grp.members.includes(userID)) throw new error("Member already in group")

        try {
            const added = await Group.findOneAndUpdate(
                { _id: groupID },
                { $push: { members: userID } },
                { new: true }
            )

            return added
        }
        catch(err) {
            throw new error("Error adding member")
        }
    }

    async updateGroup(id: string, data) {
        const grp = await Group.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        )
        this.checkGrp(grp)
        return grp
    } 

    async deleteGroup(id: string) {
        const grp = await Group.findOneAndDelete({ _id: id })
        this.checkGrp(grp)
        return grp
    } 

    async getMessages(id: string) {
        const grp = await Group.findById(id).populate("messages", "sender content") 
        this.checkGrp(grp)

        const { messages } = grp
        return messages
    }

    async sendMessage(id: string, data) {
        const grp = await Group.findById(id)
        this.checkGrp(grp)

        const msg = await Message.create(data)
        try {
            const sent = await Group.findOneAndUpdate(
                { _id: id },
                { $push: { messages: msg._id } },
                { new: true }
            )

            return sent
        }
        catch(err) {
            throw new error("Error sending message")
        }        
    }

    async deleteMessage(groupID: string, msgID: string) {
        const grp = await Group.findById(groupID)
        const msg = await Message.findById(msgID)
        if(!grp && !msg) throw new error("Error occurred")

        try {
            const deleted = await Group.findOneAndUpdate(
                { _id: groupID },
                { $pull: { messages: msgID } },
                { new: true }
            )

            const { messages } = deleted
            return messages
        }
        catch(error) {
            throw new error("Error deleting message")
        }
    }

    async getMembers(id: string) {
        const grp = await Group.findById(id).populate("members", "name") 
        this.checkGrp(grp)
        const { members } = grp
        return members
    } 

    async getMember(groupID: string, memberID: string) {
        const grp = await Group.findById(groupID)
        this.checkGrp(grp)

        const member = await User.findById(memberID)
        this.checkMember(member)
        return member
    } 

    async removeMember(groupID: string, memberID: string) {
        const grp = await Group.findById(groupID)
        this.checkGrp(grp)

        try {
            const removed = await Group.findOneAndUpdate(
                { _id: groupID },
                { $pull: { members: memberID } },
                { new: true }
            )
            
            const { members } = removed
            return members
        }
        catch(err) {
            throw new error("Error removing member")
        }
    } 
}

export default new GroupService()