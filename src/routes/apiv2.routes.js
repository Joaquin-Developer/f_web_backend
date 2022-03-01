const { Router } = require("express")
const controller = require("../controllers/api.controller")

const router = Router()

router.get("/tour_dates", controller.getAllTourDates)
router.post("/tour_dates", controller.newTourDate)
router.delete("/tour_date", controller.deleteTourDate)
router.post("/update_tour_date", controller.updateTourDate)

module.exports = router
