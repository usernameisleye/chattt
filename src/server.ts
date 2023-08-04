import app from "."
import connect from "./config/db"
import { port } from "./config/env"
import errorMiddleware from "./middlewares/error.middleware"

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