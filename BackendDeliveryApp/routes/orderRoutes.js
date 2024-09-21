import express from "express"
import { ordersController } from "../controllers/ordersController.js"
import passport from "passport"

const router = express.Router()

router.route('/create').post(passport.authenticate('jwt', {session: false}), ordersController.create)
router.route('/findByStatus/:status').get(passport.authenticate('jwt', {session: false}), ordersController.findByStatus)
router.route('/updateToDispatched').put(passport.authenticate('jwt', {session: false}), ordersController.updateToDispatched)

export default router