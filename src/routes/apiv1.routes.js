const { Router } = require("express")
const controller = require("../controllers/api.controller")

const router = Router()

router.get("/tour_dates", controller.getTourDates)

module.exports = router
