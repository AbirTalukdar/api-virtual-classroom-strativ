const { createAdminService } = require("./admin.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

module.exports = {
    createAdmin: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createAdminService(body, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Dtabase Connection Error"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    }
}