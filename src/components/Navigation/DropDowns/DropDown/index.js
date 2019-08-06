import React from 'react'
import cls from './DropDown.module.css'
import PropTypes from "prop-types";

const DropDown = ({label, type, show, items, onClick, onChange}) => {

    const clsButton = cls[type];

    return (
        <div className={cls.DropDown}>
            <button className={clsButton} onClick={onClick}>
                <span className={cls.label}>{label}</span>
            </button>
            <ul className={show ? [cls.menu].concat(cls.show).join(' ') : cls.menu}>
                {
                    items.map((item, index) => (
                        <li className={item.active ? [cls.item].concat(cls.active).join(' ') : cls.item}
                            key={index}
                            onClick={() => onChange(item.name)}
                        >
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

DropDown.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['filter', 'sort', 'type']).isRequired,
    show: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        active: PropTypes.bool
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DropDown