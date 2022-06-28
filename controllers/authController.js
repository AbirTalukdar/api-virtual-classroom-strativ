const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const models = require('../models')
const Admin = require('../models/admin');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};
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
                        adminId: admin.id
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
function teacherSignup(req,res){

    models.Teacher.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message:"Teacher Email Already Exist"
            });
        }else{
            const generatedPassword = crypto.randomBytes(12).toString('hex');
            console.log("generated password for tacher is ", generatedPassword);
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(req.body.generatedPassword, salt, function(err, hash){
                    const teacher = {
                        name:req.body.name,
                        email:req.body.email,
                        admin_id: req.body.admin_id,
                        password: hash
                    }
                    models.Teacher.create(teacher).then(result => {
                        res.status(201).json({
                            message:"Teacher Created Sucessfully",
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
exports.protect = (...user) => {
    return async (req, res, next) => {
      // 1) Getting token and check of it's there
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
    
      if (!token) {
        return next(
          new AppError('You are not logged in! Please log in to get access.', 401)
        );
      }
    
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
      // 3) Check if user still exists
      let currentUser;
  
      if(user.includes("teacher")){
        currentUser = await User.findById(decoded.id);
      }else if(user.includes("student")){
        currentUser = await Student.findById(decoded.id);
      }else{
        console.log("no role matched");
      }
      
      if (!currentUser) {
        return next(
          new AppError(
            'The user belonging to this token does no longer exist.',
            401
          )
        );
      }
    
      // GRANT ACCESS TO PROTECTED ROUTE
      req.user = currentUser;
      next();
    }
  }
  
  
  exports.restrictTo = (...roles) => {
      return (req, res, next) => {
      console.log("req user role is ", req.user.role);
        if (!roles.includes(req.user.role)) {
          return next(
            new AppError('You do not have permission to perform this action', 403)
          );
        }
    
        next();
      };
  };

module.exports = {
    adminSignup: adminSignup,
    adminLogin: adminLogin,
    teacherSignup: teacherSignup
}