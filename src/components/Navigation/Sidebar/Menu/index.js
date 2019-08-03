import React from 'react'
import cls from './Menu.module.css'
import MenuItem from "./MenuItem";
import {connect} from "react-redux";

const Menu = props => {

    const renderItems = (items) => {
        return items.filter(item => item.roles.includes(props.role)).map((item, index) => (
                <MenuItem
                    key={index}
                    to={item.to}
                    exact={item.exact}
                    label={item.label}
                    fa={item.fa}
                    isOpen={props.isOpen}
                />
            )
        )
    };

    return (
        <div className={cls.Menu}>
            <ul>
                {renderItems(props.items)}
            </ul>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        role: state.user.users.filter(user => user.id === state.user.userId)[0].role
    }
}

export default connect(mapStateToProps)(Menu)