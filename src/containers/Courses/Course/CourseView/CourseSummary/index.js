import React from 'react'
import cls from './CourseSummary.module.css'
import CourseProgress from "../../CourseProgress";
import course from "../../../../../assets/images/course.png";
import moment from "moment";
import {Link} from "react-router-dom";

const CourseSummary = props => {

    const formatDate = (date) => moment(date, 'YYYYMMDD').format('MMMM Do @ YYYY');

    return (
        <div className={cls.CourseSummary}>
            <div className={cls.date}>
                <strong>Start:</strong> {formatDate(props.course.start)} |
                <strong>End:</strong> {formatDate(props.course.end)}
            </div>
            <img src={course} alt="Course" className={cls.img}/>
            <h3><Link to={`/course/${props.course.id}`}>{props.course.name}</Link></h3>
            <div className={cls.desc}>{props.course.desc}</div>

            <CourseProgress
                width='50%'
                progress={props.course.progress}
            />
            <div className={cls.edit}>
                {props.children}
            </div>
        </div>
    )
};

export default CourseSummary