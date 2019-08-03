import React from 'react'
import cls from './Assignments.module.css'
import {connect} from "react-redux";
import Assignment from "./Assignment";

const Assignments = props => {

    const userCourses = [...props.user.courses];
    const courses = [...props.courses];

    return (
        <div className={cls.Assignments}>
            <div className={cls.header}>Assignments</div>
            <div className={cls.content}>
                {
                    userCourses.map(uc =>
                        courses.filter(c => c.id === uc.id)
                            .map((c,index) => <Assignment
                                    key={index}
                                    course={c.name}
                                    items={c.items.filter(i => i.assignees.includes(props.user.id)).map(i => ({name: i.name}))}
                                />
                            )
                    )
                }
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

export default connect(mapStateToProps)(Assignments)