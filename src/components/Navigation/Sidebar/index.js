import React from 'react'
import cls from './Sidebar.module.css'
import Menu from "./Menu";
import PropTypes from "prop-types";

const Sidebar = ({menus, isOpen}) => {
    return (
        <div className={cls.Sidebar}>
            <Menu
                items={menus}
                isOpen={isOpen}
            />
        </div>
    )
};

Sidebar.propTypes = {
  menus: PropTypes.array,
  isOpen: PropTypes.bool
};

export default Sidebar