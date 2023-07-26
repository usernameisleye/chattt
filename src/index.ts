import "express-async-errors"
import connect from "./config/db"
import express, { Application } from "express"
import appConfig from "./middlewares/pre.middleware" 
import errorMiddleware from "./middlewares/error.middleware"

const app: Application = express()
appConfig(app)

async function db() {
    await connect(app)
}
db()

// Routes...

errorMiddleware(app)
app.on("error", (error) => {
    console.error(`Server incurred an error: \n ${error}`)
})

