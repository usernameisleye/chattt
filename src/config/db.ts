import mongoose from "mongoose"
import { Application } from "express"
import { dbUrl, port } from "./env"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
}

const connect = async (app: Application) => {
    try {
        await mongoose.connect(dbUrl, options)
        app.listen(port, () => {
            console.log("connected")
        })
    }
    catch(error) {
        console.error(`connection error: ${error.message}`)
        process.exit(1)
    }
}

export default connect