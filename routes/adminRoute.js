const express = require("express");
const authController = require("../controllers/authController") 
const teacherController = require("../controllers/teacherController")
const authenticator = require('../middleware/auth');

const router = express.Router();

router.post('/create-admin', authController.adminSignup);
router.post('/admin-login', authController.adminLogin);
router.post('/create-teacher', authenticator.authenticateAdmin, authController.createTeacher);
router.get('/all-teacher', authenticator.authenticateAdmin, teacherController.getAllTeacher)


module.exports = router;