import React, {Component} from 'react'
import cls from './DropDowns.module.css'
import DropDown from './DropDown';

class DropDowns extends Component {

    state = {
        dropDowns: [
            {
                menu: {
                    name: 'In progress',
                    type: 'filter'
                },
                show: false,
                menus: [
                    {
                        name: 'In progress',
                        active: true
                    },
                    {
                        name: 'Past',
                        active: false
                    },
                    {
                        name: 'Scheduled',
                        active: false
                    }
                ]
            },
            {
                menu: {
                    name: 'Course name',
                    type: 'sort'
                },
                show: false,
                menus: [
                    {
                        name: 'Course name',
                        active: true
                    },
                    {
                        name: 'Course date',
                        active: false
                    }
                ]
            },
            {
                menu: {
                    name: 'Card',
                    type: 'type'
                },
                show: false,
                menus: [
                    {
                        name: 'Card',
                        active: true
                    },
                    {
                        name: 'List',
                        active: false
                    },
                    {
                        name: 'Summary',
                        active: false
                    }
                ]
            }

        ]
    };
    
    componentDidMount() {
        const init = this.props.initial;
        if (!!init) {
            const dropDowns = [...this.state.dropDowns];
            Object.keys(init).forEach(key => {
                dropDowns
                    .filter(dd => dd.menu.type === key)
                    .forEach(dd => {
                        dd.menu.name = init[key];
                        dd.menus.forEach(menu => menu.active = false);
                        dd.menus.filter(menu => menu.name === init[key]).forEach(menu => menu.active = true);
                    })
            });

            this.setState({
                dropDowns
            })
        }
    }

    showClickHandler = type => {
        const dropDowns = [...this.state.dropDowns];

        dropDowns.filter(dd => dd.menu.type === type).forEach(dd => dd.show = !dd.show);

        this.setState({
            dropDowns
        })
    };

    changeHandler = type => name => {
        const dropDowns = [...this.state.dropDowns];

        const dd = dropDowns.filter(dd => dd.menu.type === type)[0];

        dd.menu.name = name;
        dd.menus.forEach(menu => menu.active = false);
        dd.menus.filter(menu => menu.name === name).forEach(menu => menu.active = true);
        dd.show = !dd.show;

        this.setState({
            dropDowns
        });

        this.props.onClickHandlers[type](name);
    };

    render() {
        return (
            <div className={cls.DropDowns}>
                {
                    this.state.dropDowns.map((dd, index) => (
                        <DropDown
                            key={index}
                            label={dd.menu.name}
                            type={dd.menu.type}
                            items={dd.menus}
                            show={dd.show}
                            onClick={() => this.showClickHandler(dd.menu.type)}
                            onChange={this.changeHandler(dd.menu.type)}
                        />
                    ))
                }
            </div>
        )
    }

}

export default DropDowns