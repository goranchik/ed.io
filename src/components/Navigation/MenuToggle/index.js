import React from 'react'
import cls from './MenuToggle.module.css'
import PropTypes from "prop-types";

const MenuToggle = ({isOpen, onToggle}) => {

    const classes = [
        'fa'
    ];

    isOpen
        ? classes.push('fa-times') && classes.push(cls.open)
        : classes.push('fa-bars');

    return (
        <div className={cls.MenuToggle} onClick={onToggle}>
            <i className={classes.join(' ')} />
        </div>

    )
};

MenuToggle.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func
};

export default MenuToggle