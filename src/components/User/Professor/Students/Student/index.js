import React from 'react'
import cls from './Student.module.css'

const Student = props => {
    return (
        <div className={cls.Student}>
            <div>{props.student.firstName}</div>
            <div>{props.student.lastName}</div>
            <div>{props.student.level}</div>
            <div className={cls.grade}>
                <span>{Math.round(props.student.grade)}</span>
            </div>
        </div>
    )
};

export default Student