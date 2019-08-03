import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout';
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from "./containers/Auth";
import {connect} from "react-redux";
import Logout from './components/Logout'
import {autoLogin} from "./store/actions/user";
import Dashboard from "./containers/Dashboard";
import Courses from "./containers/Courses";
import Course from "./containers/Courses/Course";
import CourseRedirect from "./containers/Courses/Course/CourseRedirect";
import Grades from "./components/User/Student/Grades";
import Assignments from "./components/User/Student/Assignments";
import Students from "./components/User/Professor/Students";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" component={Auth}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            switch (this.props.user.role) {
                case 'student':
                    routes = (
                        <Switch>
                            <Route path="/courses" component={Courses}/>
                            <Route path="/course/:id" component={Course}/>
                            <Route path="/assignments" component={Assignments}/>
                            <Route path="/grades" component={Grades}/>
                            <Route path="/logout" component={Logout}/>
                            <Route exact path="/" component={Dashboard}/>
                            <Redirect to="/"/>
                        </Switch>
                    );
                    break;
                case 'professor':
                    routes = (
                        <Switch>
                            <Route path="/courses" component={Courses}/>
                            <Route exact path="/course/new" component={CourseRedirect}/>
                            <Route path="/course/:id" component={Course}/>
                            <Route path="/students" component={Students}/>
                            <Route path="/logout" component={Logout}/>
                            <Route exact path="/" component={Dashboard}/>
                            <Redirect to="/"/>
                        </Switch>
                    );
                    break;
                default:
                    routes = (
                        <Switch>
                            <Route path="/courses" component={Courses}/>
                            <Route path="/course/:id" component={Course}/>
                            <Route path="/logout" component={Logout}/>
                            <Route exact path="/" component={Dashboard}/>
                            <Redirect to="/"/>
                        </Switch>
                    );
            }
        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.users.filter(user => user.id === state.user.userId)[0]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
