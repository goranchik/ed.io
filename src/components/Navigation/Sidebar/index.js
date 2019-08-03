import React from 'react'
import cls from './Sidebar.module.css'
import Menu from "./Menu";

const Sidebar = props => {
    return (
        <div className={cls.Sidebar}>
            <Menu
                items={props.menus}
                isOpen={props.isOpen}
            />
        </div>
    )
};

export default Sidebar