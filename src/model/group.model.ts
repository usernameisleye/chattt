import { Schema, model, Types } from "mongoose"

interface Message {
    sender: Types.ObjectId
    content: string,
    timestamps: Date
}

export interface GroupInterface {
    name: string
    description: string
    members: Types.ObjectId[]
    messages: Message[]
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
                sender: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                content: {
                    type: Schema.Types.String,
                    trim: true,
                    required: true
                },
                timestamps: {
                    type: Schema.Types.Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

export default model("Group", groupSchema)