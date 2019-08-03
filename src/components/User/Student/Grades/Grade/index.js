import React, {Component} from 'react'
import cls from './Grade.module.css'
import CourseProgress from "../../../../../containers/Courses/Course/CourseProgress";

class Grade extends Component {

    state = {
        isEditGrade: false,
        isEditProgress: false
    };

    editGrade = () => {
        this.setState({
            isEditGrade: !this.state.isEditGrade
        })
    };

    editProgress = () => {
        this.setState({
            isEditProgress: !this.state.isEditProgress
        })
    };

    submitHandler = event => {
        event.preventDefault()
    };

    render() {
        return (
            <div className={cls.Grade}>
                <div className={cls.metric}>{this.props.metric}</div>
                {
                    this.state.isEditProgress
                        ? <input
                            autoFocus={true}
                            type="text"
                            value={this.props.progress}
                            onBlur={this.editProgress}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    this.editProgress()
                                }
                            }}
                            onChange={event => this.props.onProgressChange(this.props.studentId, +event.target.value)}
                          />
                        : this.props.progress || this.props.studentId
                        ? <div
                            className={cls.progress}
                            onClick={this.editProgress}
                          >
                            <CourseProgress
                                progress={this.props.progress}
                            />
                          </div>
                        : null
                }
                <div
                    className={cls.grade}
                >
                    {
                        this.state.isEditGrade
                            ? <input
                                autoFocus={true}
                                type="text"
                                value={this.props.grade}
                                onBlur={this.editGrade}
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        this.editGrade()
                                    }
                                }}
                                onChange={event => this.props.onGradeChange(this.props.studentId, +event.target.value)}
                            />
                            : <span onClick={this.editGrade}>{this.props.grade}</span>
                    }
                </div>

            </div>
        )
    }

}

export default Grade