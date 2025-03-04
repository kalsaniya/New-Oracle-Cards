const express = require("express");
const router = express.Router();
const cards = require("../controllers/savecontroller");

router.route("/getcard").get(cards.getsave);



module.exports = router;