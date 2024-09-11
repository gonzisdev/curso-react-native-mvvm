import express from "express"
import { userController } from "../controllers/usersController.js"

const router = express.Router()

router.route('/create').post(userController.register);

export default router