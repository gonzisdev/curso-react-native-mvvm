import express from "express"
import { categoriesController } from "../controllers/categoriesController.js"
import multer from "multer"
import passport from "passport"

const router = express.Router()

export const upload = multer({
    storage: multer.memoryStorage()
})

router.route('/create').post(passport.authenticate('jwt', {session: false}), upload.single('image', 1), categoriesController.create)

export default router