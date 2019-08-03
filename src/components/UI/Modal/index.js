import React from 'react'
import cls from './Modal.module.css'

const Modal = props => {
    const faClose = ['fa fa-times', cls.close];
    return (
        <div className={cls.Modal}
             style={{
                 top: `calc(50% - ${props.height / 2}px`,
                 left: `calc(50% - ${props.width / 2}px`
             }}>
            <div style={{
                width: props.width + 'px'
            }}>
                <div onClick={props.onClose} className={faClose.join(' ')}/>
                <div className={cls.message}>{props.message}</div>
                <div className={cls.content}>
                    {props.children}
                </div>
                <div onClick={props.onOk} className={cls.okMessage}>{props.okMessage}</div>
            </div>
        </div>
    )
};

export default Modal