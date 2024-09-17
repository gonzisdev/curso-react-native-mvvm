import express from "express"
import { productsController } from "../controllers/productsController.js"
import multer from "multer"
import passport from "passport"

const router = express.Router()

export const upload = multer({
    storage: multer.memoryStorage()
})

//router.route('/getAll').get(passport.authenticate('jwt', {session: false}), categoriesController.getAll)
router.route('/products').post(passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.create)
// router.route('/updateWithImage').put(passport.authenticate('jwt', {session: false}), upload.single('image', 1), categoriesController.updateWithImage)
// router.route('/update').put(passport.authenticate('jwt', {session: false}), categoriesController.update)
// router.route('/delete/:id').delete(passport.authenticate('jwt', {session: false}), categoriesController.delete)

export default router