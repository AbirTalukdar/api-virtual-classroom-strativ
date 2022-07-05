require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const AdminRouter = require('./routes/adminRoute');
const TeacherRouter = require('./routes/teacherRoute');
const ClassroomRouter = require('./routes/classroomRouter');
const ExamRouter = require('./routes/examRouter');

const app = express();
//HTTP security header
app.use(helmet());

app.use(bodyParser.json());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Strativ Virtual Classroom API')
})
app.use('/api/admin', AdminRouter);
app.use('/api/teacher', TeacherRouter);
app.use('/api/classroom', ClassroomRouter);
app.use('/api/exam', ExamRouter);
app.listen(process.env.PORT || process.env.APP_PORT, ()=>{
    console.log("Server Running on http://localhost:",`${process.env.APP_PORT}`)
})