import express from "express"
import { ordersController } from "../controllers/ordersController.js"
import passport from "passport"

const router = express.Router()

router.route('/create').post(passport.authenticate('jwt', {session: false}), ordersController.create)
router.route('/findByStatus/:status').get(passport.authenticate('jwt', {session: false}), ordersController.findByStatus)
router.route('/findByDeliveryAndStatus/:id_delivery/:status').get(passport.authenticate('jwt', {session: false}), ordersController.findByDeliveryAndStatus)
router.route('/updateToDispatched').put(passport.authenticate('jwt', {session: false}), ordersController.updateToDispatched)
router.route('/updateToOnTheWay').put(passport.authenticate('jwt', {session: false}), ordersController.updateToOnTheWay)
router.route('/updateToDelivered').put(passport.authenticate('jwt', {session: false}), ordersController.updateToDelivered)

export default router