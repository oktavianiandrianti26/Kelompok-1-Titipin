const express = require("express");
const router = express.Router();
const { GetProvinceByName, GetCityByName, GetCost } = require("../controllers_user/rajaongkirController");

router.get("/getProvinceByName/:name", GetProvinceByName);
router.get("/getCityByName/:name/:type", GetCityByName);
router.get("/getCost/:origin/:destination/:weight/:courier", GetCost);

module.exports = router;
