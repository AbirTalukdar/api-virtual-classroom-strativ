const {createAdmin} = require("./admin.controller");
const router = require("express").Router();

router.post('/createAdmin', createAdmin);

module.exports = router;