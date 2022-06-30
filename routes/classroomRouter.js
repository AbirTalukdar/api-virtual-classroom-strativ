const express = require("express");
const classroomController = require('../controllers/classroomController');
const authenticator = require('../middleware/auth');

const router = express.Router();

router.post('/create', authenticator.authenticateTeacher, classroomController.createClassroom);

module.exports = router;