import dotenv from "dotenv"
dotenv.config()

export const environment = process.env.NODE_ENV || ""
export const port = process.env.PORT || ""
export const dbUrl = process.env.DB_URL || ""

export const tokenInfo = {
    salt: process.env.BCRYPT_SALT || "",
    secret: process.env.JWT_SECRET || "",
    tokenValidity: parseInt(process.env.TOKEN_VALIDITY_SEC || "0"),
    refreshValidity: parseInt(process.env.REFRESH_VALIDITY_SEC || "0"),
}

export const corsUrl = process.env.CORS_URL

export const mail = {
    email: process.env.EMAIL_MAIL || "",
    password: process.env.EMAIL_PASSWORD || "",
    host: process.env.EMAIL_HOST || "",
}