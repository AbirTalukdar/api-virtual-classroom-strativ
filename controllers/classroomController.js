const models = require('../models');

function createClassroom(req, res) {
    const teacherId = req.user.teacherId;
    const name = req.body.name;
    const subjectCode = req.body.subject_code;
    models.Classroom.create({
        teacher_id: teacherId,
        name,
        subject_code: subjectCode
    }).then((classroom) => {
        res.status(200).json(classroom);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message:"Something Went Wrong"
        });
    })
}

module.exports = {createClassroom}