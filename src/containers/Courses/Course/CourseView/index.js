import React from 'react'
import cls from './CourseView.module.css'
import CourseCard from "./CourseCard";
import CourseItem from "./CourseItem";
import CourseSummary from "./CourseSummary";

const CourseView = props => {

    let courseView;

    switch (props.type.toLowerCase()) {
        case 'card':
            courseView = <CourseCard course={props.course}/>;
            break;
        case 'list':
            courseView = <CourseItem course={props.course}/>;
            break;
        case 'summary':
            courseView = <CourseSummary course={props.course}/>;
            break;
        default:
            courseView = <CourseCard course={props.course}/>;
    }

    return (
        <div className={cls.CourseView}>
            {
                courseView
            }
        </div>
    )
};

export default CourseView