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
router.route('/updateWithImage').put(passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.updateWithImage)
router.route('/update').put(passport.authenticate('jwt', {session: false}), productsController.update)
router.route('/delete/:id').delete(passport.authenticate('jwt', {session: false}), productsController.delete)

export default router