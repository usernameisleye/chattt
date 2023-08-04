import { Schema, model, Types } from "mongoose"

export interface MessageInterface {
    sender: Types.ObjectId
    reciever: Types.ObjectId
    content: string
    read: boolean
    pinned: boolean
}

const msgSchema = new Schema<MessageInterface>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reciever: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: Schema.Types.String,
            trim: true,
            required: true
        },
        read: {
            type: Schema.Types.Boolean,
            default: false
        },
        pinned: {
            type: Schema.Types.Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

export default model("Message", msgSchema)