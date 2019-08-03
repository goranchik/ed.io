import React from 'react'
import cls from './CourseCard.module.css'
import CourseProgress from "../../CourseProgress";
import card from "../../../../../assets/images/card.jpeg";
import moment from "moment";
import {Link} from "react-router-dom";

const CourseCard = props => {

    const formatDate = (date) => moment(date, 'YYYYMMDD').format('MMMM Do @ YYYY');

    return (
        <div className={cls.CourseCard}>
            <div className={cls.card}
                 style={
                     {
                         backgroundImage: `url(${card})`,
                         backgroundSize: 'cover',
                         backgroundRepeat: 'none'
                     }
                 }/>
            <div className={cls.date}>
                <strong>Start:</strong> {formatDate(props.course.start)} |
                <strong>End:</strong> {formatDate(props.course.end)}
            </div>
            <div className={cls.name}>
                <Link to={`/course/${props.course.id}`}>{props.course.name}</Link>
            </div>
            <CourseProgress
                width='100%'
                progress={props.course.progress}
            />
        </div>
    )
};

export default CourseCard