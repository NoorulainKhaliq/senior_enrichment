import React, { Component } from 'react';
import Header from './Header'
import AllCampuses from '../campus/AllCampuses';
import AllStudents from './AllStudents';
import AddStudForm from './AddStudForm';
import Homepage from './Homepage.jsx'
import SingleCampus from '../campus/SingleCampus'
import SingleStudent from './SingleStudent'
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchCampuses, fetchStudents } from '../store'
import axios from 'axios'


export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            campuses: [],
            students: []
        }
    }
    componentDidMount() {
        axios.get('/api/campus')
            .then(res => res.data)
            .then(campuses => this.setState({ campuses }))
        axios.get('/api/students')
            .then(res => res.data)
            .then(students => this.setState({ students }))
    }

    render() {
        return (
            <div>
                <Header />

                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/students' component={AllStudents} />
                    <Route exact path='/campus' render={() => (
                        <AllCampuses campuses={this.state.campuses} />
                    )}
                    />
                    <Route exact path='/campus/:campusId' component={SingleCampus} />
                    <Route exact path='/student/newstudent' component={AddStudForm} />
                    <Route exact path='/student/:id' component={SingleStudent} />
                </Switch>
            </div>
        )
    }
}

<Route exact path='/' render={(props) => (
    <PageContent {...props} pass_to_page_content='hi' />
)} />

//<Route exact path='/campus' component={AllCampuses} />