import React from 'react'
import cls from './Item.module.css'
import Button from "../../../../../components/UI/Button";

const Item = props => {

    let usersToAssign;
    if (props.isEdit) {
        usersToAssign = props.participants.filter(p => !props.assignees.filter(a => a.id === p.id)[0]);
    }

    return (
        <div className={cls.Item}>
            <div>{props.name}</div>
            <div>
                {
                    props.isEdit && usersToAssign && usersToAssign.length !== 0
                        ? <Button
                            type="primary"
                            onClick={() => props.onAssign(props.id, props.assignees, usersToAssign)}
                        >+</Button>
                        : null
                }
                {
                    props.assignees.map((a, index) => (
                        <div
                            key={index}
                            className={cls.assignee}
                        >
                            {a.name}
                            {
                                props.isEdit
                                    ? <div
                                        className={cls.unassign}
                                        onClick={() => props.onUnAssign(a.id)}
                                      >
                                        X
                                      </div>
                                    : null
                            }
                        </div>
                    ))
                }
                {
                    props.isEdit
                        ? <Button
                            onClick={props.onDelete}
                        >-</Button>
                        : null
                }
            </div>
        </div>
    )
};


export default Item