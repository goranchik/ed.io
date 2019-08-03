import React from 'react'
import cls from './Select.module.css'

const Select = props => {
    const id = `${props.label}-${Math.random()}`;

    return (
        <div className={cls.Select}>
            <label htmlFor={id}>{props.label}</label>
            <select
                id={id}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => {
                    return (
                        <option
                            key={`${id}-${option.value}-${index}`}
                            value={option.value}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
};

export default Select
