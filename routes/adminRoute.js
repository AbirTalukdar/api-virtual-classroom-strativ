const express = require("express");
const authController = require("../controllers/authController") 
const router = require("express").Router();
const authenticator = require('../middleware/auth');

router.post('/create-admin', authController.adminSignup);
router.post('/admin-login', authController.adminLogin);
router.post('/create-teacher', authenticator.authenticateAdmin, authController.createTeacher);


module.exports = router;