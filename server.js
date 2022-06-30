require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const AdminRouter = require("./routes/adminRoute");

const app = express();
//HTTP security header
app.use(helmet());

app.use(bodyParser.json());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Strativ Virtual Classroom API')
})
app.use('/api/admin', AdminRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server Running on http://localhost:",process.env.APP_PORT)
})