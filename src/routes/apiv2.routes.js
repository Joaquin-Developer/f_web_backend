const { Router } = require("express")
const controller = require("../controllers/api.controller")

const router = Router()

router.get("/tour_dates", controller.getActualTourDates)
router.get("/all_tour_dates", controller.getAllTourDates)
router.post("/tour_date", controller.newTourDate)
router.delete("/tour_date", controller.deleteTourDate)
router.post("/update_tour_date", controller.updateTourDate)

module.exports = router
