import Message, { MessageInterface } from "../model/msg.model"
import error from "../utils/error"

class MessageService {
    check = (msg: MessageInterface) => {
        if(!msg) throw new error("Message does not exists")
    }

    async getMessages() {
        return await Message.find({}).sort({ createdAt: -1 })
    }

    async sendMessage(data) {
        const { reciever, content } = data
        if(!reciever && !content) throw new error("Error sending message")
        return await Message.create(data)
    }

    async updateMessage(id: string, data) {
        const msg = await Message.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        )
        this.check(msg)
        return msg
    }

    async deleteMessage(id: string) {
        const msg = await Message.findOneAndDelete({ _id: id })
        this.check(msg)
        return msg
    }
}

export default new MessageService()