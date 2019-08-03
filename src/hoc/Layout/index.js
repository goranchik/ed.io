import React, {Component} from 'react'
import cls from './Layout.module.css'
import {connect} from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Navigation/Sidebar";
import Auth from "../../containers/Auth";

class Layout extends Component {

    state = {
        menu: false,
        university: 'MIT',
        menus: [
            {
                to: '/',
                exact: true,
                label: 'Home',
                fa: 'fa-home',
                roles: ['student', 'professor']
            },
            {
                to: '/courses',
                exact: true,
                label: 'Courses',
                fa: 'fa-align-justify',
                roles: ['student', 'professor']
            },
            {
                to: '/course/new',
                exact: true,
                label: 'Create Course',
                fa: 'fa-plus',
                roles: ['professor']
            },
            {
                to: '/assignments',
                exact: true,
                label: 'Assignments',
                fa: 'fa-book-reader',
                roles: ['student']
            },
            {
                to: '/grades',
                exact: true,
                label: 'Grades',
                fa: 'fa-carrot',
                roles: ['student']
            },
            {
                to: '/students',
                exact: true,
                label: 'Students',
                fa: 'fa-user-graduate',
                roles: ['professor']
            },
            {
                to: '/logout',
                exact: true,
                label: 'Logout',
                fa: 'fa-sign-out-alt',
                roles: ['student', 'professor']
            },
        ]
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    };

    render() {
        return (
            <div className={cls.Layout}>
                {
                    this.props.isAuthenticated
                      ? <React.Fragment>
                            <Header
                                university={this.state.university}
                                menu={this.state.menu}
                                onToggle={this.toggleMenuHandler}
                            />
                            <Sidebar
                                menus={this.state.menus}
                                isOpen={this.state.menu}
                            />
                            <main>
                                <div className={cls.wrapper}>
                                    {this.props.children}
                                </div>
                            </main>
                        </React.Fragment>
                      : <Auth/>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapStateToProps)(Layout)