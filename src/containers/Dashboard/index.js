import React from 'react'
import cls from './Dashboard.module.css'
import Courses from "../Courses";
import Grades from "../../components/User/Student/Grades";
import Assignments from "../../components/User/Student/Assignments";
import {connect} from "react-redux";
import Students from "../../components/User/Professor/Students";

const Dashboard = props => {
    return (
        <div className={cls.Dashboard}>
            <Courses/>
            {
                props.role === 'student'
                    ? <React.Fragment>
                        <Grades/>
                        <Assignments/>
                    </React.Fragment>
                    : props.role === 'professor'
                    ? <Students/>
                    : null
            }
        </div>
    )

};

function mapStateToProps(state) {
    return {
        role: state.user.users.filter(user => user.id === state.user.userId)[0].role
    }
}

export default connect(mapStateToProps)(Dashboard)