import React from 'react'
import cls from './Menu.module.css'
import MenuItem from "./MenuItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Menu = ({items, role, isOpen}) => {

    const renderItems = (items) => {
        return items.filter(item => item.roles.includes(role)).map((item, index) => (
                <MenuItem
                    key={index}
                    to={item.to}
                    exact={item.exact}
                    label={item.label}
                    fa={item.fa}
                    isOpen={isOpen}
                />
            )
        )
    };

    return (
        <div className={cls.Menu}>
            <ul>
                {renderItems(items)}
            </ul>
        </div>
    )
};

Menu.propTypes = {
    items: PropTypes.array,
    role: PropTypes.oneOf(['student', 'professor']),
    isOpen: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        role: state.user.users.filter(user => user.id === state.user.userId)[0].role
    }
}

export default connect(mapStateToProps)(Menu)