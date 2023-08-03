import { Router } from "express"
import MessageController from "../controllers/msg.controller"

const router = Router()

router.get("/", MessageController.getMessages)

router.post("/", MessageController.sendMessage)

router.patch("/:id", MessageController.updateMessage)

router.delete("/:id", MessageController.deleteMesssage)

export default router