import React from 'react'
import cls from './CourseProgress.module.css'

const CourseProgress = props => {
    return (
        <div className={cls.CourseProgress} style={{width: props.width}}>
            <div className={cls.barWrapper}>
                <div className={cls.bar} style={{width: `${props.progress}%`}}/>
            </div>
            <div className={cls.prcnt}>{props.progress}% complete</div>
        </div>
    )
};

export default CourseProgress