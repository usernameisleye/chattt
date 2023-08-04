import "express-async-errors"
import express, { Application } from "express"
import router from "./routes/index.route"
import appConfig from "./middlewares/pre.middleware" 

const app: Application = express()
appConfig(app)

app.use("/api/v1", router)

export default app