import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header'
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import Homepage from './Homepage.jsx'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import { Route, Switch, Redirect } from 'react-router-dom';

//this is now stateless
const Main = () => {
    return (
        <div>
            <Header />
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route exact path='/students' component={AllStudents}/>
                    <Route exact path='/campus' component={AllCampuses}/>
                    <Route exact path='/campus/:campusId' component={SingleCampus}/>
                    <Route exact path='/student/:id' component={SingleStudent}/>
                </Switch>
        </div>  
    )
}

export default Main;

//<Route exact path='/students/:id' component={SingleStudent}/>
