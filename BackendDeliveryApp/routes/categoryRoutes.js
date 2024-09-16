import express from "express"
import { categoriesController } from "../controllers/categoriesController.js"
import multer from "multer"
import passport from "passport"

const router = express.Router()

export const upload = multer({
    storage: multer.memoryStorage()
})

router.route('/getAll').get(passport.authenticate('jwt', {session: false}), categoriesController.getAll)
router.route('/create').post(passport.authenticate('jwt', {session: false}), upload.single('image', 1), categoriesController.create)
router.route('/delete/:id').delete(passport.authenticate('jwt', {session: false}), categoriesController.delete)

export default router