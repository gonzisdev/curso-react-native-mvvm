import express from "express"
import { addressController } from "../controllers/addressController.js"
import passport from "passport"

const router = express.Router()

router.route('/create').post(passport.authenticate('jwt', {session: false}), addressController.create)

export default router