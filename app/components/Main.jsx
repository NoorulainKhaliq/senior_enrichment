import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header'
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus'
import { Route, Switch, Redirect } from 'react-router-dom';


export default class Main extends Component {
    constructor(props) {
        super()
        this.state = {
            allCampuses: [],
            selectedCampus: [], //all the students associated with the selected campus
            allStudents: []
        }
        this.selectedCampus = this.selectedCampus.bind(this)
    }
    componentDidMount() {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => {
            this.setState({allCampuses: campuses})
        })
        axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.setState({allStudents: students})
        })
    }

    selectedCampus(campusId) {
        axios.get(`/api/campus/${campusId}`)
        .then(res => res.data)
        .then(campusStudents => {
            this.setState({selectedCampus: campusStudents.map(student => {return student.name})})
        })
    }

    render() {
        return (
            <div>
                <Header />
                    <Switch>
                        <Route exact path='/' render={() => (<AllCampuses selectedCampus={this.selectedCampus} campuses={this.state.allCampuses}/>)}/>
                        <Route exact path='/students' render={() => (<AllStudents students={this.state.allStudents} allCampuses={this.state.allCampuses}/>)}/>
                        <Route path='/campus/:campusId' component={SingleCampus}/>
                    </Switch>
            </div>  
        )
    }
}


//<AllCampuses selectedCampus={this.selectedCampus} campuses={this.state.allCampuses}/>
//<SingleCampus selectedCampus={this.state.selectedCampus} />