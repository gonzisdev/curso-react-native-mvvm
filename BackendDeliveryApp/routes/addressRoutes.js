import express from "express"
import { addressController } from "../controllers/addressController.js"
import passport from "passport"

const router = express.Router()

router.route('/create').post(passport.authenticate('jwt', {session: false}), addressController.create)
router.route('/findByUser/:id_user').get(passport.authenticate('jwt', {session: false}), addressController.findByUser)

export default router