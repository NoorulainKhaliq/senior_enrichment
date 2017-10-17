import React, { Component } from 'react';
import studentService from '../services/student-service'
import campusService from '../services/campus-service'
import {NavLink} from 'react-router-dom'

export default class SingleStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {selectedStudent:{}}
    }
    componentDidMount() {
        //make an axios request to render the students information, including email
        studentService.getSingleStudent(this.props.match.params.id)
        .then(student => {
            this.setState({selectedStudent: student})
        })
    }

    render() {
        const student = this.state.selectedStudent;
        const campus = student.campus ? student.campus : {};
        const campusId= campus ? campus.id : {}
        
        return (
            <div className="row">
            <div className="text-left">
              <ul>
              <h2>Campus Name: <NavLink to={`/campus/${campusId}`}> {campus.name}</NavLink> </h2>
              <li >Name: {student.name}</li>
              <li>Student ID: {student.id}</li>
              <li>Email: {student.email}</li>
              </ul>
            </div>
          </div>
        )
    }
}