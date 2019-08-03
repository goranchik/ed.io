import React from 'react'
import cls from './Participants.module.css'
import Button from "../../../../components/UI/Button";

const Participants = props => {
    let usersToAdd;
    if (props.isEdit) {
        usersToAdd = props.users.filter(u => !props.participants.filter(p => p.id === u.id)[0]);
    }

    return (
        <div className={cls.Participants}>
            <div className={cls.header}>
                <div>{props.header ? props.header : 'Participants'}</div>
                {
                    props.isEdit && usersToAdd && usersToAdd.length !== 0
                        ?  <Button
                            type="success"
                            onClick={() => props.onAdd(props.participants, usersToAdd)}
                           >+</Button>
                        : null
                }
            </div>
            <div className={cls.table}>
                <div>
                    {
                        props.participants.map((p, index) => (
                            <div
                                key={index}
                                className={cls.participant}
                            >
                                <div>{p.name}</div>
                                {
                                    props.isEdit
                                        ?  <Button
                                            onClick={() => props.onDelete(p.id)}
                                        >-</Button>
                                        : null
                                }
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
};


export default Participants