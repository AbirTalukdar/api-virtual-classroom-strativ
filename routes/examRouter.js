const express = require("express");
const examController = require('../controllers/examController');
const authenticator = require('../middleware/auth');

const router = express.Router();

router.post('/create', authenticator.authenticateTeacher, examController.createExam);

module.exports = router;