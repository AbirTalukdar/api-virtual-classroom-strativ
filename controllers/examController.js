const models = require('../models');

function createExam(req, res) {
    const classroomId = req.user.classroomId;
    const total_mark = req.body.name;
    const deadline = req.body.subject_code;
    models.Exam.create({
        classroom_id: classroomId,
        total_mark,
        deadline: deadline
    }).then((classroom) => {
        res.status(200).json(classroom);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message:"Something Went Wrong"
        });
    })
}

module.exports = {createExam}