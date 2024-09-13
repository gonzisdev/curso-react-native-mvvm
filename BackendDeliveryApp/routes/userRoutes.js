import express from "express"
import { userController } from "../controllers/usersController.js"
import multer from "multer"

const router = express.Router()

export const upload = multer({
    storage: multer.memoryStorage()
})

router.route('/create').post(userController.register)
router.route('/createWithImage').post(upload.single('image', 1), userController.registerWithImage)
router.route('/login').post(userController.login)

export default router