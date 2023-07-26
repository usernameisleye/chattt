import "express-async-errors"
import connect from "./config/db"
import { port } from "./config/env"
import express, { Application } from "express"

import appConfig from "./middlewares/pre.middleware" 
import errorMiddleware from "./middlewares/error.middleware"

const app: Application = express()
appConfig(app)

app.listen(port, async () => {
    await connect()

    console.log(
        `Server is listening on ${port}`
    )
})

errorMiddleware(app)
app.on("error", (error) => {
    console.error(`Server incurred an error: \n ${error}`)
})

export default app