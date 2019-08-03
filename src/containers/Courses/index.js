import React from 'react'
import cls from './Courses.module.css'
import CourseView from "./Course/CourseView";
import DropDowns from "../../components/Navigation/DropDowns";
import {connect} from "react-redux";
import {changeViewType, filterView, sortView} from "../../store/actions/course";
import moment from "moment";
import {withRouter} from "react-router-dom";


function filterCourses(filter, start, end) {
    const FORMAT = 'YYYYMMDD';
    switch (filter) {
        case 'in progress':
            return moment().isBetween(moment(start, FORMAT), moment(end, FORMAT));
        case 'past':
            return moment().isAfter(moment(end, FORMAT));
        case 'scheduled':
            return moment().isBefore(moment(start, FORMAT));
        default:
            return moment().isBetween(moment(start, FORMAT), moment(end, FORMAT));
    }
}

const Courses = props => {

    const sortKey = props.view.sort === 'Course name' ? 'name' : 'start';

    const courses = [...props.courses];

    const userCourses = [...props.user.courses]
        .map(uc => ({
            ...courses.filter(c => c.id === uc.id)[0],
            progress: uc.progress
        }))
        .filter(c => filterCourses(props.view.filter.toLowerCase(), c.start, c.end))
        .sort((a, b) => a[sortKey] < b[sortKey] ? -1 : b[sortKey] > a[sortKey]);


    return (
        <div className={cls.Courses}>
            <div className={cls.header}>List of Courses</div>
            <DropDowns
                initial={props.view}
                onClickHandlers={{
                    filter: props.filterView,
                    sort: props.sortView,
                    type: props.changeViewType
                }}
            />
            <div className={cls.view}>
                {
                    userCourses.map((course, index) => (
                        <CourseView
                            key={index}
                            course={course}
                            type={props.view.type}
                        />
                    ))
                }
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        user: state.user.users.filter(user => user.id === state.user.userId)[0],
        courses: state.course.courses,
        view: state.course.view
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterView: filter => dispatch(filterView(filter)),
        sortView: sort => dispatch(sortView(sort)),
        changeViewType: type => dispatch(changeViewType(type))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Courses))