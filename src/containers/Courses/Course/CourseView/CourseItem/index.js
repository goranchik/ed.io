import React from 'react'
import cls from './CourseItem.module.css'
import CourseProgress from "../../CourseProgress";
import moment from "moment";
import {Link} from "react-router-dom";

const CourseItem = props => {

    const formatDate = (date) => moment(date, 'YYYYMMDD').format('MMMM Do');

    return (
        <div className={cls.CourseItem}>
            <Link to={`/course/${props.course.id}`}>{props.course.name}</Link>&nbsp;
            <span>({formatDate(props.course.start)} - {formatDate(props.course.end)})</span>
            <CourseProgress
                width="40%"
                progress={props.course.progress}
            />
        </div>
    )
};

export default CourseItem