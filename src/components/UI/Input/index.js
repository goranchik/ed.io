import React from 'react'
import cls from './Input.module.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text';
    const classes = [cls.Input];
    const id = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        classes.push(cls.invalid)
    }


    return (
        <div className={classes.join(' ')}>
            <label htmlFor={id}>{props.label}</label>
            {
                inputType === 'textarea'
                    ? <textarea
                        rows="4"
                        id={id}
                        value={props.value}
                        onChange={props.onChange}
                      />
                    : inputType === 'date'
                    ? <DatePicker
                        selected={props.value ? moment(props.value, 'YYYYMMDD').toDate() : props.value}
                        onChange={props.onChange}
                        popperPlacement="right-start"
                        popperModifiers={{
                            flip: {
                                enabled: false
                            },
                            preventOverflow: {
                                enabled: true,
                                escapeWithReference: false
                            }
                        }}
                        selectsStart
                        startDate={new Date()}
                      />
                    : <input
                        autoFocus={props.autoFocus}
                        type={inputType}
                        id={id}
                        value={props.value}
                        onChange={props.onChange}
                        onKeyDown={props.onKey}
                      />
            }

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Type correct value'}</span>
                    : null
            }
        </div>
    );
};

export default Input