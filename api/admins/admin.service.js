const pool = require("../../config/database.js");

module.exports = {
    createAdminService: (data,callBack) => {
        pool.query(
            `insert into admin(email,password) values(?,?)`,
            [
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    }
}