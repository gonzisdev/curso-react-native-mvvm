import express from "express"
import { productsController } from "../controllers/productsController.js"
import multer from "multer"
import passport from "passport"

const router = express.Router()

export const upload = multer({
    storage: multer.memoryStorage()
})

router.route('/findByCategory/:id_category').get(passport.authenticate('jwt', {session: false}), productsController.findByCategory)
router.route('/create').post(passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.create)


export default router