import { Router } from "express"

import MsgRoute from "./msg.route"
import UserRoute from "./user.route"
import AuthRoute from "./auth.route"
import GroupRoute from "./group.route"
import auth from "../middlewares/auth.middleware"

const router = Router()

router.use(auth)

router.use("/msg", MsgRoute)
router.use("/auth", AuthRoute)
router.use("/user", UserRoute)
router.use("/group", GroupRoute)

export default router