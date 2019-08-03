import React from 'react'
import cls from './Items.module.css'
import Item from "./Item";
import Button from "../../../../components/UI/Button";

const Items = props => {

    return (
        <div className={cls.Items}>
            <div className={cls.header}>
                <div>Items</div>
                {
                    props.isEdit
                        ? <Button
                            type="success"
                            onClick={props.onAdd}
                        >+</Button>
                        : null
                }
            </div>
            <div className={cls.table}>
                <div>
                    {
                        !!props.items
                            ? props.items.sort((i1, i2) => i1.id - i2.id).map((item, index) => (
                                <Item
                                    key={index}
                                    id={item.id}
                                    name={item.name}
                                    assignees={
                                        item.assignees
                                            .map(id => props.users.filter(user => user.id === id)[0])
                                            .map(user => ({id: user.id, name: user.name}))
                                    }
                                    isEdit={props.isEdit}
                                    participants={props.participants}
                                    onDelete={() => props.onDelete(item.id)}
                                    onAssign={props.onAssign}
                                    onUnAssign={props.onUnAssign ? props.onUnAssign(item.id) : null}
                                />
                              ))
                            : null
                    }
                </div>
            </div>
        </div>
    )
};

export default Items