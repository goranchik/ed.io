import React from 'react'
import cls from './Assignment.module.css'

const Assignment = props => {
    return (
        <div className={cls.Assignment}>
            <div className={cls.course}>{props.course}</div>
            <div className={cls.items}>
                {
                    props.items.map((item,index) => <div key={index} className={cls.item}>{item.name}</div>)
                }
            </div>
        </div>
    )
};

export default Assignment