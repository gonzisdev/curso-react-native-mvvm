import express from "express"
import { userController } from "../controllers/usersController.js"
import multer from "multer"
import passport from "passport"

const router = express.Router()

export const upload = multer({
    storage: multer.memoryStorage()
})

router.route('/create').post(userController.register)
router.route('/createWithImage').post(upload.single('image', 1), userController.registerWithImage)
router.route('/login').post(userController.login)
router.route('/update').put(passport.authenticate('jwt', {session: false}), upload.single('image', 1), userController.updateWithImage)
router.route('/updateWithoutImage').put(passport.authenticate('jwt', {session: false}), userController.updateWithoutImage)

export default router