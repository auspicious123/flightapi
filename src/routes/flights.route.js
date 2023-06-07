const express = require("express");
const router = express.Router();

const { getFlightsPrice } =require("../controllers/flights.controller");


router.get("/getflights",getFlightsPrice);

module.exports = router;