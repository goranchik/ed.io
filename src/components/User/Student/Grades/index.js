import React from 'react'
import cls from './Grades.module.css'
import Grade from "./Grade";
import {connect} from "react-redux";

const Grades = props => {

    const userCourses = [...props.user.courses];
    const courses = [...props.courses];

    return (
        <div className={cls.Grades}>
            <div className={cls.header}>Grades</div>
            <div className={cls.table}>
                <div className={cls.tableHeader}>
                    <div>Course</div>
                    <div>Grade</div>
                </div>
                <div>
                    {
                        userCourses.map(uc =>
                            courses.filter(c => c.id === uc.id)
                                .map((c, index) =>
                                    <Grade
                                        key={index}
                                        metric={c.name}
                                        grade={uc.grade}
                                    />
                                )
                        )
                    }
                </div>
            </div>
        </div>
    )

};

function mapStateToProps(state) {
    return {
        user: state.user.users.filter(user => user.id === state.user.userId)[0],
        courses: state.course.courses
    }
}

export default connect(mapStateToProps)(Grades)