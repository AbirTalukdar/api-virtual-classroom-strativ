const { promisify } = require('util');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const models = require('../models')
const bcrypt = require('bcrypt');


//Admin Registration Function Start
function adminSignup(req,res){
    models.Admin.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message:"Email Already Exist"
            });
        }else{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(req.body.password, salt, function(err, hash){
                    const admin = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                    models.Admin.create(admin).then(result => {
                        res.status(201).json({
                            message:"Admin Created Sucessfully",
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message:"Something Went Wrong"
                        });
                    })
                })
            })
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message:"Something Went Wrong"
        });
    });
}

// Admin Login
function adminLogin(req,res){
    models.Admin.findOne({where:{email:req.body.email}}).then(admin=>{
        if(admin === null ){
            res.status(401).json({
                message:"Invalid Credentials",
            })
        }else{
            bcrypt.compare(req.body.password, admin.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: admin.email,
                        adminId: admin.id,
                        role: 'admin'
                    },process.env.JWT_SECRET, function(err, token){
                        res.status(200).json({
                            message:"Authentication Sucessfull",
                            token: token
                        })
                    });
                }else{
                    res.status(401).json({
                        message:"Invalid Credentials",
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message:"Authentication failed"
        })
    })
}
//teacher create
function createTeacher(req,res){

    models.Teacher.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message:"Teacher Email Already Exist"
            });
        }else{
            const generatedPassword = crypto.randomBytes(8).toString('hex');
            console.log("generated password for tacher is ", generatedPassword);
            const message = `
            Congratulations\n you have been added in the Virtual Classroom as a Teacher. 
            Your Password ${generatedPassword} for Login virtual classroom! 
            `
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(generatedPassword, salt, function(err, hash){
                    const teacher = {
                        name:req.body.name,
                        email:req.body.email,
                        admin_id: req.user.adminId,
                        password: hash
                    }
                    models.Teacher.create(teacher).then(result => {
                        res.status(201).json({
                            message:"Teacher Created Sucessfully"
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message:"Something Went Wrong"
                        });
                    })
                })
            })
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message:"Something Went Wrong"
        });
    });
}
//teacher Login
function teacherLogin(req,res){
    models.Teacher.findOne({where:{email:req.body.email}}).then(teacher=>{
        if(teacher === null ){
            res.status(401).json({
                message:"Invalid Credentials",
            })
        }else{
            bcrypt.compare(req.body.password, teacher.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: teacher.email,
                        teacherId: teacher.id,
                        role: 'teacher',
                    },process.env.JWT_SECRET, function(err, token){
                        res.status(200).json({
                            message:"Authentication Sucessfull",
                            token: token
                        })
                    });
                }else{
                    res.status(401).json({
                        message:"Invalid Credentials",
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message:"Authentication failed"
        })
    })
}

module.exports = {
    adminSignup: adminSignup,
    adminLogin: adminLogin,
    createTeacher: createTeacher,
    teacherLogin: teacherLogin,
    // studentLogin: studentLogin,
}