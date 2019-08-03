import React from 'react'
import cls from './User.module.css'
import avatar from '../../assets/images/avatar.png'
import Participation from "../Participation";
import {connect} from "react-redux";
import moment from "moment";

function getStatus(start, end) {
    const FORMAT = 'YYYYMMDD';

    if (moment().isAfter(moment(end, FORMAT))) {
        return 'past'
    } else if (moment().isBefore(moment(start, FORMAT))) {
        return 'scheduled'
    } else {
        return 'inProgress'
    }

}

const User = props => {

    const {role, level = 0, grade = 0} = props.user;

    const userCourses = [...props.user.courses];
    const courses = [...props.courses];

    const initParticipation = {
        past: 0,
        inProgress: 0,
        scheduled: 0
    };

    const participation = userCourses.reduce((res, uc) => {
            const course = courses.filter(c => c.id === uc.id)[0];
            if (course) {
                res[getStatus(course.start, course.end)] += 1
            }
            return res;
        }, initParticipation
    );

    const clsStar = ['fa', 'fa-star'].concat(cls.star);

    return (
        <div className={cls.User}>

            {
                role === 'student'
                    ? <div className={cls.level}><span>{level}</span></div>
                    : null
            }

            <img src={avatar} alt="Avatar" className={cls.avatar}/>
            <div className={cls.name}>{props.user.firstName} {props.user.lastName} ({role})</div>

            {
                role === 'student'
                    ? <div className={cls.grade}>
                        Avg. grade: {grade}%
                        <div className={clsStar.join(' ')}/>
                    </div>
                    : null
            }

            <Participation
                past={participation.past}
                inProgress={participation.inProgress}
                scheduled={participation.scheduled}
            />

        </div>
    )
};

function mapStateToProps(state) {
    return {
        user: state.user.users.filter(user => user.id === state.user.userId)[0],
        courses: state.course.courses
    }
}

export default connect(mapStateToProps)(User)