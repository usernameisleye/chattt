import { Schema, model, Types } from "mongoose"
import { compare, hash } from "bcrypt"
import { tokenInfo } from "../config/env"

export interface UserInterface {
    _id: Types.ObjectId
    name: string
    email: string
    password: string
    profilePic: string
    role: "user" | "admin"
    pinned: boolean
    archived: boolean
}

const userSchema = new Schema<UserInterface>(
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

userSchema.pre("save", async function(next) {
    const { salt } = tokenInfo
    if(this.isModified("password")) 
    {
        next()
    }

    this.password = await hash(this.password, Number(salt))
    next()
})

userSchema.methods.compare = async function(userpass: string) {
    return await compare(userpass, this.password)
}

export default model("User", userSchema)