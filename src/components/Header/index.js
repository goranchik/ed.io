import React from 'react'
import cls from './Header.module.css'
import User from "../User";
import MenuToggle from "../Navigation/MenuToggle";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({
                    university = 'MIT', menu = false, onToggle = () => {}
                }) => {
    const clsFa = ['fa', 'fa-sign-out-alt'].concat(cls.fa);
    return (
        <div className={cls.Header}>
            <div className={cls.leftBlock}>
                <MenuToggle
                    onToggle={onToggle}
                    isOpen={menu}
                />
                <div className={cls.university}>University: {university}</div>
                <User/>
            </div>
            <div className={cls.rightBlock}>
                <NavLink
                    to="/logout"
                >
                    <i className={clsFa.join(' ')}/>
                </NavLink>
            </div>
        </div>
    )
};

Header.propTypes = {
    university: PropTypes.string.isRequired,
    menu: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default Header