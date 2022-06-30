const express = require("express");
// const teacherController = require("./../controllers/teacherController");
const authController = require('../controllers/authController');
const authenticator = require('../middleware/auth');

const router = express.Router();


router.post('/teacher-login', authController.teacherLogin);

module.exports = router;