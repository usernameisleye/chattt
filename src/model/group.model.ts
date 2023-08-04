import { Schema, model, Types } from "mongoose"
import { MessageInterface } from "./msg.model"

export interface GroupInterface {
    name: string
    description: string
    members: Types.ObjectId[]
    messages: MessageInterface[]
    pinned: boolean
}

const groupSchema = new Schema<GroupInterface>(
    {
        name: {
            type: Schema.Types.String,
            trim: true,
            required: true
        },
        description: {
            type: Schema.Types.String,
            trim: true
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message"
            }
        ]
    },
    {
        timestamps: true
    }
)

export default model("Group", groupSchema)