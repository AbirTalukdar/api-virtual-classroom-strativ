require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const AdminRouter = require("./api/admins/admin.router");
const TeacherRouter = require("./api/teachers/teacher.router");
const StudentRouter = require("./api/students/student.router");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Strativ Virtual Classroom API')
})
app.use('/api/admin', AdminRouter);
app.use('/api/teacher', TeacherRouter);
app.use('/api/student', StudentRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server Running on http://localhost:",process.env.APP_PORT)
})