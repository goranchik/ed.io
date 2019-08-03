import React from 'react'
import cls from './Participation.module.css'

const Participation = props => {
    const clsFa = ['fa', cls.fa];
    return (
        <div className={cls.Participation}>
            <span>Courses:</span>
            <div>
                <i className={clsFa.concat('fa-check-circle').join(' ')}/>
                {props.past}
            </div>
            <div>
                <i className={clsFa.concat('fa-bolt').join(' ')}/>
                {props.inProgress}
            </div>
            <div>
                <i className={clsFa.concat('fa-calendar').join(' ')}/>
                {props.scheduled}
            </div>
        </div>
    )
};

export default Participation