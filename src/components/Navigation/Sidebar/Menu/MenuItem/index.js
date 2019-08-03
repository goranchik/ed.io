import React from 'react'
import cls from './MenuItem.module.css'
import {NavLink} from "react-router-dom";

const MenuItem = props => {
    const clsFa = ['fas'];
    return (
        <li className={cls.MenuItem}>
            <NavLink
                to={props.to}
                exact={props.exact}
                activeClassName={cls.active}
            >
                <i className={clsFa.concat(props.fa).join(' ')}/>
                <div
                    className={cls.label}
                    style={{display: props.isOpen ? 'inline-block' : 'none'}}
                >{props.label}</div>
            </NavLink>
        </li>
    )
};

export default MenuItem