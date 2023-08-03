import { Router } from "express"
import auth from "../middlewares/auth.middleware"
import GroupContoller from "../controllers/group.contoller"

const router = Router()

// router.use(auth)

router.get("/", GroupContoller.getGroups)

router.get("/:id", GroupContoller.getGroup)

router.post("/", GroupContoller.createGroup)

router.patch("/join/:groupID/:userID", GroupContoller.joinGroup)

router.patch("/:id", GroupContoller.updateGroup)

router.delete("/:id", GroupContoller.deleteGroup)

router.get("/members/:groupID", GroupContoller.getMembers)

router.get("/members/:groupID/:userID", GroupContoller.getMember)

router.patch("/members/:groupID/:userID", GroupContoller.removeMember)

export default router