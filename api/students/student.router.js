const router = require("express").Router();

router.get('/', (req,res)=>{
    res.send('student')
});

module.exports = router;