import React, {Component} from 'react'
import cls from './CourseCreator.module.css'
import {createControl, validate, validateForm} from "../../../../form/formFramework";
import Input from "../../../../components/UI/Input";
import Auxiliary from "../../../../hoc/Auxiliary";
import {connect} from "react-redux";
import Button from "../../../../components/UI/Button";
import {saveCourse} from "../../../../store/actions/course";
import moment from "moment";
import Participants from "../Participants";
import Items from "../Items";
import Modal from "../../../../components/UI/Modal";
import Backdrop from "../../../../components/UI/Backdrop";
import Select from "../../../../components/UI/Select";
import {saveCourseParticipants, saveProfessorCourse} from "../../../../store/actions/user";


const DATE_FORMAT = 'YYYYMMDD';

function createFormControls(course, participants, items) {
    return {
        name: createControl({
            type: 'text',
            label: 'The course name',
            errorMessage: 'Course name cannot be empty',
            value: !!course ? course.name : '',
            valid: !!course
        }, {required: true}),
        desc: createControl({
            type: 'textarea',
            label: 'A brief course description',
            errorMessage: 'Description cannot be empty',
            value: !!course ? course.desc : '',
            valid: !!course
        }, {required: true}),
        start: createControl({
            type: 'date',
            label: 'The start date',
            errorMessage: 'Start date cannot be empty',
            value: !!course ? course.start : '',
            valid: !!course
        }, {required: true}),
        end: createControl({
            type: 'date',
            label: 'The end date',
            errorMessage: 'End date cannot be empty',
            value: !!course ? course.end : '',
            valid: !!course
        }, {required: true}),
        participants: createControl({
            type: 'participants',
            value: !!participants ? participants : [],
            valid: true
        }, null),
        items: createControl({
            type: 'items',
            value: !!items ? items : [],
            valid: true
        }, null)
    }
}


class CourseCreator extends Component {

    state = {
        isFormValid: validateForm(createFormControls(this.props.course, this.props.participants, this.props.items)),
        formControls: createFormControls(this.props.course, this.props.participants, this.props.items),
        addParticipant: {
            flag: false,
            participants: [],
            usersToAdd: []
        },
        addAssignee: {
            flag: false,
            itemId: null,
            assignees: [],
            usersToAssign: []
        },
        addItem: {
            flag: false,
            valid: false,
            value: ''
        }
    };

    submitHandler = event => {
        event.preventDefault()
    };

    changeHandler = (value, name) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[name]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[name] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    };

    saveHandler = () => {
        const course = Object.keys(this.state.formControls)
            .filter(key => this.state.formControls[key].touched)
            .reduce((res, key) => {
                    let value = this.state.formControls[key].value;
                    if (key === 'participants') {
                        value = !!value ? [...value.map(p => p.id), this.props.professorId] : value
                    }
                    return {
                        ...res,
                        [key]: value instanceof Date
                            ? moment(value).format(DATE_FORMAT)
                            : value
                    }
                },
                {
                    id: this.props.course.id
                }
            );

        if (this.props.course.isNew) {
            this.props.saveProfessorCourse(this.props.professorId, course.id);
        }

        if (!course.participants && this.props.course.isNew) {
            course.participants = [this.props.professorId];
        }

        this.props.saveCourse(course);

        if (!!course.participants) {
            this.props.saveCourseParticipants(course.id, course.participants);
        }

        this.setState({
            isRedirect: true
        })
    };

    addParticipantHandler = (participants, usersToAdd) => {
        this.setState({
            addParticipant: {
                flag: true,
                participants,
                usersToAdd
            }
        })
    };

    addParticipantSelectHandler = id => {
        if (id === 0) {
            return
        }

        this.setState({
            addParticipant: {
                flag: true,
                participants: [
                    ...this.state.addParticipant.participants,
                    {
                        ...this.state.addParticipant.usersToAdd.filter(u => u.id === id)[0]
                    }
                ],
                usersToAdd: [...this.state.addParticipant.usersToAdd.filter(u => u.id !== id)]
            }
        })
    };

    cancelAddParticipant = () => {
        this.setState({
            addParticipant: {
                flag: false,
                participants: [],
                usersToAdd: []
            }
        })
    };

    doAddParticipant = () => {
        const participantsControl = {...this.state.formControls.participants};

        participantsControl.touched = true;
        participantsControl.value = [...this.state.addParticipant.participants];

        this.setState({
            formControls: {
                ...this.state.formControls,
                participants: participantsControl
            },
            addParticipant: {
                flag: false,
                participants: [],
                usersToAdd: []
            }
        })
    };

    deleteParticipantHandler = (id) => {
        const participantsControl = {...this.state.formControls.participants};
        const itemsControl = {...this.state.formControls.items};

        participantsControl.touched = true;
        participantsControl.value = participantsControl.value.filter(p => p.id !== id);

        let isItemsTouched = false;

        const items = itemsControl.value.map(ic => {
            const rest = ic.assignees.filter(a => a !== id);
            if (ic.assignees.length > rest.length) {
                isItemsTouched = true;
                return {...ic, assignees: rest};
            } else {
                return ic;
            }
        });

        this.setState({
            formControls: {
                ...this.state.formControls,
                participants: participantsControl,
                items: {
                    ...itemsControl,
                    value: items,
                    touched: isItemsTouched
                }
            }
        });
    };

    assignHandler = (itemId, assignees, usersToAssign) => {
        this.setState({
            addAssignee: {
                flag: true,
                itemId,
                assignees,
                usersToAssign
            },
        })
    };

    addAssigneeSelectHandler = (id) => {
        if (id === 0) {
            return
        }

        this.setState({
            addAssignee: {
                ...this.state.addAssignee,
                flag: true,
                assignees: [
                    ...this.state.addAssignee.assignees,
                    {
                        ...this.state.addAssignee.usersToAssign.filter(u => u.id === id)[0]
                    }
                ],
                usersToAssign: [...this.state.addAssignee.usersToAssign.filter(u => u.id !== id)]
            }
        })
    };

    cancelAddAssignee = () => {
        this.setState({
            addAssignee: {
                flag: false,
                itemId: null,
                assignees: [],
                usersToAssign: []
            }
        })
    };

    doAddAssignee = () => {
        const itemsControl = {...this.state.formControls.items};
        const itemId = this.state.addAssignee.itemId;

        itemsControl.touched = true;

        const item = itemsControl.value.filter(p => p.id === itemId)
            .map(item => (
                {
                    ...item,
                    assignees: this.state.addAssignee.assignees.map(a => a.id)
                }
            ))[0];

        this.setState({
            formControls: {
                ...this.state.formControls,
                items: {
                    ...itemsControl,
                    value: [
                        ...itemsControl.value.filter(p => p.id !== itemId),
                        {...item}
                    ]
                }
            },
            addAssignee: {
                flag: false,
                itemId: null,
                assignees: [],
                usersToAssign: []
            }
        })
    };

    unAssignHandler = itemId => userId => {

        const itemsControl = {...this.state.formControls.items};

        itemsControl.touched = true;
        const item = itemsControl.value.filter(p => p.id === itemId)
            .map(item => ({...item, assignees: item.assignees.filter(a => a !== userId)}))[0];

        this.setState({
            formControls: {
                ...this.state.formControls,
                items: {
                    ...itemsControl,
                    value: [
                        ...itemsControl.value.filter(p => p.id !== itemId),
                        {...item}
                    ]
                }
            }
        });
    };

    addItemHandler = () => {
        this.setState({
            addItem: {
                ...this.state.addItem,
                flag: true
            }
        })
    };

    doAddItem = () => {
        const itemsControl = {...this.state.formControls.items};

        itemsControl.touched = true;

        const item = {
            id: itemsControl.value.length + 1,
            name: this.state.addItem.value,
            assignees: []
        };

        this.setState({
            formControls: {
                ...this.state.formControls,
                items: {
                    ...itemsControl,
                    value: [
                        ...itemsControl.value,
                        {...item}
                    ]
                }
            },
            addItem: {
                flag: false,
                valid: false,
                value: ''
            }
        })
    };

    changeItemHandler = (value) => {
        this.setState({
            addItem: {
                ...this.state.addItem,
                valid: !!value && !!value.trim() && value.trim().length > 3,
                value
            }
        })
    };

    cancelAddItem = () => {
        this.setState({
            addItem: {
                flag: false,
                valid: false,
                value: ''
            }
        })
    };
    deleteItemHandler = (id) => {
        const itemsControl = {...this.state.formControls.items};

        itemsControl.touched = true;
        itemsControl.value = itemsControl.value.filter(p => p.id !== id);

        this.setState({
            formControls: {
                ...this.state.formControls,
                items: itemsControl
            }
        });
    };

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                control.type === 'participants'
                    ? <Participants
                        key={index}
                        isEdit={true}
                        participants={control.value}
                        users={this.props.users}
                        onAdd={this.addParticipantHandler}
                        onDelete={this.deleteParticipantHandler}
                    />
                    : control.type === 'items'
                    ? <Items
                        key={index}
                        isEdit={true}
                        items={control.value}
                        participants={[...this.state.formControls.participants.value]}
                        users={this.props.users}
                        onAdd={this.addItemHandler}
                        onDelete={this.deleteItemHandler}
                        onAssign={this.assignHandler}
                        onUnAssign={this.unAssignHandler}
                    />
                    : <Auxiliary key={index}>
                        <Input
                            type={control.type}
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={event =>
                                this.changeHandler(!!event
                                    ? event instanceof Date
                                        ? event
                                        : event.target.value
                                    : event
                                    , controlName)
                            }
                        />

                        {index === 0 ? <hr/> : null}
                    </Auxiliary>
            )
        })
    }


    render() {
        return (
            <div className={cls.CourseCreator}>
                <div>
                    <h1>{!!this.props.course && this.props.course.isNew ? 'Create' : 'Edit'} Course</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        <div className={cls.buttons}>
                            <Button
                                type="success"
                                onClick={this.saveHandler}
                                disabled={!this.state.isFormValid}
                            >
                                {!!this.props.course && this.props.course.isNew ? 'Create' : 'Save'}
                            </Button>
                            <Button
                                type="cancel"
                                onClick={this.props.onCancel}
                                disabled={false}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>

                    {
                        this.state.addParticipant.flag
                            ? <React.Fragment>
                                <Modal
                                    width="400"
                                    height="300"
                                    message="Add new participant"
                                    okMessage="Save"
                                    onClose={this.cancelAddParticipant}
                                    onOk={this.doAddParticipant}
                                >
                                    <Participants
                                        participants={this.state.addParticipant.participants}
                                    />
                                    {
                                        !!this.state.addParticipant.usersToAdd.length
                                            ? <Select
                                                label="Add a participant"
                                                options={
                                                    [{value: 0, text: ''}].concat(this.state.addParticipant.usersToAdd
                                                        .map(u => ({value: u.id, text: u.name})))
                                                }
                                                onChange={event => this.addParticipantSelectHandler(+event.target.value)}
                                            />
                                            : null
                                    }

                                </Modal>
                                <Backdrop
                                    onClick={this.cancelAddParticipant}
                                />
                            </React.Fragment>
                            : null
                    }

                    {
                        this.state.addAssignee.flag
                            ? <React.Fragment>
                                <Modal
                                    width="400"
                                    height="250"
                                    message="Add new assignee"
                                    okMessage="Save"
                                    onClose={this.cancelAddAssignee}
                                    onOk={this.doAddAssignee}
                                >
                                    <Participants
                                        header="Assignees"
                                        participants={this.state.addAssignee.assignees}
                                    />
                                    {
                                        !!this.state.addAssignee.usersToAssign.length
                                            ? <Select
                                                label="Add an assignee"
                                                options={
                                                    [{value: 0, text: ''}].concat(this.state.addAssignee.usersToAssign
                                                        .map(u => ({value: u.id, text: u.name})))
                                                }
                                                onChange={event => this.addAssigneeSelectHandler(+event.target.value)}
                                            />
                                            : null
                                    }
                                </Modal>
                                <Backdrop
                                    onClick={this.cancelAddAssignee}
                                />
                            </React.Fragment>
                            : null
                    }

                    {
                        this.state.addItem.flag
                            ? <React.Fragment>
                                <Modal
                                    width="400"
                                    height="200"
                                    message="Add new item"
                                    okMessage={this.state.addItem.valid ? 'Save' : ''}
                                    onClose={this.cancelAddItem}
                                    onOk={this.doAddItem}
                                >
                                    <Input
                                        label="New Item"
                                        autoFocus={true}
                                        valid={this.state.addItem.valid}
                                        value={this.state.addItem.value}
                                        shouldValidate={true}
                                        touched={true}
                                        errorMessage="Cannot be empty & min length > 3"
                                        onChange={event => this.changeItemHandler(event.target.value)}
                                        onKey={event => {
                                            if (event.key === 'Enter') {
                                                this.doAddItem()
                                            }
                                        }}
                                    />
                                </Modal>
                                <Backdrop
                                    onClick={this.cancelAddItem}
                                />
                            </React.Fragment>
                            : null
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        course: state.course.course,
        professorId: state.user.userId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveCourse: (course) => dispatch(saveCourse(course)),
        saveProfessorCourse: (professorId, courseId) => dispatch(saveProfessorCourse(professorId, courseId)),
        saveCourseParticipants: (course, participants) => dispatch(saveCourseParticipants(course, participants))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCreator)