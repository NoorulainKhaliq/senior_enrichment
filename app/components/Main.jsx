import React, { Component } from 'react';
import Header from './Header'
import AllCampuses from '../campus/AllCampuses';
import AllStudents from './AllStudents';
import AddStudForm from './AddStudForm';
import Homepage from './Homepage.jsx'
import SingleCampus from '../campus/SingleCampus'
import SingleStudent from './SingleStudent'
import { Route, Switch, Redirect } from 'react-router-dom';

//this is now stateless
const Main = () => {
    return (
        <div>
            <Header />

            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/students' component={AllStudents} />
                <Route exact path='/campus' component={AllCampuses} />
                <Route exact path='/campus/:campusId' component={SingleCampus} />
                <Route exact path='/student/newstudent' component={AddStudForm} />
                <Route exact path='/student/:id' component={SingleStudent} />
            </Switch>
        </div>
    )
}

export default Main;