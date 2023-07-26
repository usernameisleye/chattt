import mongoose from "mongoose"
import { dbUrl } from "./env"

const options = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connect = async () => {
    try {
        await mongoose.connect(dbUrl, options)
        console.log("connected");
    }
    catch(error) {
        console.error(`connection error: ${error.message}`)
        process.exit(1)
    }
}

export default connect