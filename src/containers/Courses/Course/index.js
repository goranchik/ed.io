import React, {Component} from 'react'
import cls from './Course.module.css'
import CourseSummary from "./CourseView/CourseSummary";
import CourseGrades from "./CourseGrades";
import {connect} from "react-redux";
import Button from "../../../components/UI/Button";
import CourseCreator from "./CourseCreator";
import Participants from "./Participants";
import Items from "./Items";
import {editCourse, loadCourse} from "../../../store/actions/course";
import {Redirect} from "react-router-dom";

class Course extends Component {

    state = {
        goHome: false,
        goCourse: false
    };

    handleClick = () => {
        this.props.editCourse();
        if (this.props.course.isNew) {
            this.setState({
                goHome: true
            })
        }
    };

    componentDidMount() {
        let courseId = +this.props.match.params.id;
        let course = this.props.courses.filter(c => c.id === courseId)[0];
        if ((!courseId) && this.props.role === 'professor') {
            course = {
                id: this.props.courses.length + 1,
                isEdit: true,
                isNew: true,
                name: '',
                desc: '',
                start: '',
                end: '',
                participants: [],
                items: []
            }
        }

        if (!course) {
            this.setState({
                goHome: true
            })
        }

        if (!!course && course.hasOwnProperty('isNew') && course.isNew) {
            this.setState({
                goCourse: true
            })
        }

        this.props.loadCourse(course);
    }


    render() {


        const userCourse = this.props.user.courses.filter(uc => uc.id === +this.props.match.params.id)[0];
        const progress = !!userCourse ? userCourse.progress : 0;

        const participants = !this.props.course ? [] : this.props.course.participants
            .map(id => this.props.users.filter(user => user.id === id)[0])
            .filter(user => user.role === 'student')
            .map(user => ({id: user.id, name: `${user.firstName} ${user.lastName}`}));

        const items = !this.props.course ? [] : this.props.course.items;
        const users = this.props.users.filter(u => u.role === 'student')
            .map(user => ({id: user.id, name: `${user.firstName} ${user.lastName}`}));

        return (
            <div className={cls.Course}>
                {
                    !this.props.course ? null :
                        this.props.course.isEdit
                            ? <CourseCreator
                                course={this.props.course}
                                onCancel={this.handleClick}
                                participants={participants}
                                users={users}
                                items={items}
                            />
                            : <CourseSummary course={{...this.props.course, progress}}>
                                <Participants participants={participants}/>
                                <Items items={items} users={users}/>
                                {
                                    this.props.role === 'professor'
                                        ? <div className={cls.buttons}>
                                            <Button
                                                type="primary"
                                                onClick={this.handleClick}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={this.props.history.goBack}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                        : null
                                }

                            </CourseSummary>
                }
                {
                    !!this.props.course && !this.props.course.isEdit && this.props.role === 'professor'
                        ? <CourseGrades courseId={this.props.course.id}/>
                        : null
                }
                {
                    this.state.goHome
                        ? <Redirect to="/"/>
                        : this.state.goCourse
                        ? <Redirect to={'/course/' + this.props.course.id}/>
                        : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.users.filter(user => user.id === state.user.userId)[0],
        users: state.user.users,
        courses: state.course.courses,
        course: state.course.course,
        role: state.user.users.filter(user => user.id === state.user.userId)[0].role
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editCourse: () => dispatch(editCourse()),
        loadCourse: course => dispatch(loadCourse(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)