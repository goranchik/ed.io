import React from 'react'
import cls from './MenuItem.module.css'
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const MenuItem = ({label, to, exact, fa, isOpen}) => {
    const clsFa = ['fas'];
    return (
        <li className={cls.MenuItem}>
            <NavLink
                to={to}
                exact={exact}
                activeClassName={cls.active}
            >
                <i className={clsFa.concat(fa).join(' ')}/>
                <div
                    className={cls.label}
                    style={{display: isOpen ? 'inline-block' : 'none'}}
                >{label}</div>
            </NavLink>
        </li>
    )
};

MenuItem.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    exact: PropTypes.bool,
    fa: PropTypes.string,
    isOpen: PropTypes.bool
};

export default MenuItem