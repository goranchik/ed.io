import React from 'react'
import cls from './MenuToggle.module.css'

const MenuToggle = props => {
    const classes = [
        'fa'
    ];

    props.isOpen
        ? classes.push('fa-times') && classes.push(cls.open)
        : classes.push('fa-bars');

    return (
        <div className={cls.MenuToggle} onClick={props.onToggle}>
            <i className={classes.join(' ')} />
        </div>

    )
};

export default MenuToggle