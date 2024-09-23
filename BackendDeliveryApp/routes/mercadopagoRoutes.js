import express from "express"
import { mercadoPagoController } from "../controllers/mercadoPagoController.js"
import passport from "passport"

const router = express.Router()

router.route('/create').post(passport.authenticate('jwt', {session: false}), mercadoPagoController.createPayment)

export default router