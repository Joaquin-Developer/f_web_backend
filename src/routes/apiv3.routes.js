const { Router } = require("express")
const controller = require("../controllers/api.controller")

const router = Router()

router.get("/show_dates", controller.getActualShowDates)
router.get("/show_dates_current_month", controller.getCurrentMonthShowDates)
router.get("/all_show_dates", controller.getAllShowDates)
router.post("/tour_date", controller.newTourDate)
router.delete("/tour_date", controller.deleteTourDate)
router.post("/update_tour_date", controller.updateTourDate)
router.post("tour_dates_by_location", controller.getTourDatesByLocation)
router.get("/all_countries", controller.getAllCountries)
router.post("/all_states_by_country", controller.getAllStatesByCountry)
router.post("/all_cities_by_state_country", controller.getAllCitiesByStateCountry)

module.exports = router
