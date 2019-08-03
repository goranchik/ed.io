import React from 'react'
import cls from './CourseGrades.module.css'
import {connect} from "react-redux";
import Grade from "../../../../components/User/Student/Grades/Grade";
import {saveStudentCourseGrade, saveStudentCourseProgress} from "../../../../store/actions/user";

const CourseGrades = props => {

    const grades = props.users.filter(user => user.role === 'student')
        .filter(user => user.courses.filter(c => c.id === props.courseId)[0])
        .map(user => ({
            studentId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            grade: user.courses.filter(c => c.id === props.courseId)[0].grade,
            progress: user.courses.filter(c => c.id === props.courseId)[0].progress
        }));

    return (
        <div className={cls.CourseGrades}>
            <div className={cls.header}>Grades</div>
            <div className={cls.table}>
                <div className={cls.tableHeader}>
                    <div className={cls.headerMetric}>Student</div>
                    <div>Progress</div>
                    <div>Grade</div>
                </div>
                <div>
                    {
                        grades.sort((g1, g2) => g1.studentId - g2.studentId).map((g, index) =>
                            <Grade
                                key={index}
                                studentId={g.studentId}
                                metric={g.name}
                                grade={g.grade}
                                progress={g.progress}
                                onGradeChange={
                                    (studentId, value) => props.saveStudentCourseGrade(studentId, props.courseId, value > 100 ? 100 : value)
                                }
                                onProgressChange={
                                    (studentId, value) => props.saveStudentCourseProgress(studentId, props.courseId, value > 100 ? 100 : value)
                                }
                            />
                        )
                    }
                </div>
                <div className={cls.tip}>
                    <div>*Click on values to edit</div>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        users: state.user.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveStudentCourseGrade: (userId, courseId, grade) => dispatch(saveStudentCourseGrade(userId, courseId, grade)),
        saveStudentCourseProgress: (userId, courseId, progress) => dispatch(saveStudentCourseProgress(userId, courseId, progress))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseGrades)