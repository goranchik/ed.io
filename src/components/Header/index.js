import React from 'react'
import cls from './Header.module.css'
import User from "../User";
import MenuToggle from "../Navigation/MenuToggle";
import {NavLink} from "react-router-dom";

const Header = props => {
    const clsFa = ['fa', 'fa-sign-out-alt'].concat(cls.fa);
    return (
        <div className={cls.Header}>
            <div className={cls.leftBlock}>
                <MenuToggle
                    onToggle={props.onToggle}
                    isOpen={props.menu}
                />
                <div className={cls.university}>University: {props.university}</div>
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

export default Header