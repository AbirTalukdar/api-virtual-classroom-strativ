const express = require("express");
const authController = require("../controllers/authController") 
const authenticator = require('../middleware/auth');

const router = express.Router();

router.post('/create-admin', authController.adminSignup);
router.post('/admin-login', authController.adminLogin);
router.post('/create-teacher', authenticator.authenticateAdmin, authController.createTeacher);


module.exports = router;