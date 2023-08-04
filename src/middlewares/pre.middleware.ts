import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import express, { Application } from "express"

const appConfig = (app: Application) => {
    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: false }))

    return app
}

export default appConfig