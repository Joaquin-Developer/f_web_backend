const { Router } = require("express")
const controller = require("../controllers/api.controller")

const router = Router()

// show dates methods:

/**
 * @swagger
 * /show_dates:
 *   get:
 *     summary: Get Actual show dates (date >= actual_date)
 */
router.get("/show_dates", controller.getActualShowDates)

/**
 * @swagger
 * /all_show_dates:
 *   get:
 *     summary: Get all show dates
 */
router.get("/all_show_dates", controller.getAllShowDates)

/**
 * @swagger
 * /show_dates_current_month:
 *   get:
 *     summary: Get all show dates from current month
 */
router.get("/show_dates_current_month", controller.getCurrentMonthShowDates)

/**
 * @swagger
 * /show_dates:
 *   put:
 *     summary: Create a new show date
 */
router.put("/show_dates", controller.newShowDate)

/**
 * @swagger
 * /show_dates:
 *   post:
 *     summary: Update an existing show date
 */
router.post("/show_dates", controller.updateShowDate)

/**
 * @swagger
 * /show_dates:
 *   delete:
 *     summary: Delete show date
 */
router.delete("/show_dates", controller.deleteShowDate)

// tours methods:

/**
 * @swagger
 * /tours:
 *   get:
 *     summary: Get all tours
 */
router.get("/tours", controller.getAllTours)

/**
 * @swagger
 * /tours:
 *   put:
 *     summary: Create a new tour
 */
router.put("/tours", controller.newTour)

/**
 * @swagger
 * /tours:
 *   post:
 *     summary: Update an existing tour
 */
router.post("tours", controller.updateTour)

// geolocation metadata methods:

/**
 * @swagger
 * /all_countries:
 *   get:
 *     summary: Get all countries
 */
router.get("/all_countries", controller.getAllCountries)

/**
 * @swagger
 * /all_states_by_country:
 *   post:
 *     summary: Get all states by country
 */
router.post("/all_states_by_country", controller.getAllStatesByCountry)

/**
 * @swagger
 * /all_cities_by_state_country:
 *   post:
 *     summary: Get all cities by state and country
 */
router.post("/all_cities_by_state_country", controller.getAllCitiesByStateCountry)

/**
 * @swagger
 * /tour_dates_by_location:
 *   get:
 *     summary: Obtener un ejemplo
 *     responses:
 *       200:
 *         description: Ejemplo obtenido con éxito
 */
// router.post("tour_dates_by_location", controller.getTourDatesByLocation)

module.exports = router
