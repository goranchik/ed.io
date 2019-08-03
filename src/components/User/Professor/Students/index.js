import React from 'react'
import cls from './Students.module.css'
import Student from "./Student";
import {connect} from "react-redux";

const Students = props => {

    return (
        <div className={cls.Students}>
            <div className={cls.header}>Students</div>
            <div className={cls.table}>
                <div className={cls.tableHeader}>
                    <div>First name</div>
                    <div>Last name</div>
                    <div>Level</div>
                    <div>Avg. grade</div>
                </div>
                <div>
                    {
                        props.students.map((student, index) =>
                            <Student
                                key={index}
                                student={student}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        students: state.user.users.filter(user => user.role === 'student')
    }
}

export default connect(mapStateToProps)(Students)