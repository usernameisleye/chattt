import { Schema, model } from "mongoose"

interface User {
    name: string
    email: string
    password: string
    profilePic: string
    role: "user" | "admin"
    pinned: boolean
    archived: boolean
}

const userSchema = new Schema<User>(
    {
        name: {
            type: Schema.Types.String,
            trim: true,
            required: true
        },
        email: {
            type: Schema.Types.String,
            trim: true,
            unique: true,
            required: true
        },
        password: { type: Schema.Types.String },
        profilePic: { 
            type: Schema.Types.String,
            trim: true
        },
        role: {
            type: Schema.Types.String,
            trim: true,
            enum: ["user", "admin"],
            default: "user"
        },
        pinned: {
            type: Schema.Types.Boolean,
            default: false
        },
        archived: {
            type: Schema.Types.Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

export default model("User", userSchema)