import { Router } from "express"
import UserController from "../controllers/user.controller"

const router = Router()

router.get("/", UserController.getUsers)

router.get("/:id", UserController.getUser)

router.patch("/:id", UserController.updateUser)

router.delete("/:id", UserController.deleteUser)

export default router