const express = require("express");
const authController = require("../controllers/authController") 
const router = require("express").Router();

router.post('/create-admin', authController.adminSignup);
router.post('/admin-login', authController.adminLogin);
router.post('/create-teacher',authController.teacherSignup);


module.exports = router;