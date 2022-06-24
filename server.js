import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.js'
import teacherRoutes from './routes/teacher.js'
import studentRoutes from './routes/student.js'

const app = express();

app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('Strativ Virtual Classroom API')
})
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);

app.listen(4000, ()=>{
    console.log("Server Running on http://localhost:4000")
})