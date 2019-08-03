import React from 'react'
import cls from './DropDown.module.css'

const DropDown = props => {

    const clsButton = cls[props.type];

    return (
        <div className={cls.DropDown}>
           <button className={clsButton} onClick={props.onClick}>
               <span className={cls.label}>{props.label}</span>
           </button>
            <ul className={props.show ? [cls.menu].concat(cls.show).join(' ') : cls.menu }>
                {
                    props.items.map((item, index) => (
                        <li className={item.active ? [cls.item].concat(cls.active).join(' ') : cls.item}
                            key={index}
                            onClick={() => props.onChange(item.name)}
                        >
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export default DropDown