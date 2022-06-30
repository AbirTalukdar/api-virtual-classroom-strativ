const express = require("express");
// const teacherController = require("./../controllers/teacherController");
const authController = require('../controllers/authController');
const authenticator = require('../middleware/auth');

const router = require("express").Router();

// ** authController.protect('teacher') means it will query into the User(Teacher) model
// ** authController.protect('student') means it will query into the Student model

router.post('/teacher-login', authController.teacherLogin);

module.exports = router;