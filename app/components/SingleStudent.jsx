import React, { Component } from 'react';
import studentService from '../services/student-service'
import campusService from '../services/campus-service'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class SingleStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allCampuses: [],
            selectedStudent:{},
            newName: "",
            newEmail: "",
            newCampus: ""
        }
        this.updateStudent = this.updateStudent.bind(this)
        this.studentName = this.studentName.bind(this)
        this.studentEmail = this.studentEmail.bind(this)
        this.studentCampus = this.studentCampus.bind(this)
    }
    componentDidMount() {
        //make an axios request to render the students information, including email
        studentService.getSingleStudent(this.props.match.params.id)
        .then(student => {
            this.setState({selectedStudent: student})
        })
        campusService.getAllCampuses()
        .then(allCampuses => this.setState(
            {allCampuses}
        ))
    }

    updateStudent(event){
        event.preventDefault();
        const id = this.state.selectedStudent.id
        axios.put(`/api/student/${id}`, {
            name: this.state.newName,
            email: this.state.newEmail,
            campusId: this.state.newCampus
        })
    }

    studentName(event) {
        const newName = event.target.value
        this.setState({newName: newName})
    }
    studentEmail(event) {
        const newEmail = event.target.value;
        this.setState({newEmail})
    }
    studentCampus(event) {
        const newCampus = event.target.value;
        this.setState({newCampus})
    }

    render() {
        const student = this.state.selectedStudent;
        const campus = student.campus ? student.campus : {};
        const campusId= campus ? campus.id : {};
        const campuses = this.state.allCampuses;
        console.log(this.state.newCampus)
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

                <div className='text-center'>
                    <form onSubmit={this.updateStudent}>
                            <legend>Update Student Information</legend>
                        <input onChange={this.studentName} value={this.state.newName} type="text" name="student name" placeholder="enter name"/>
                        <input onChange={this.studentEmail} value={this.state.newEmail} type='text' name='student email' placeholder='enter email'/>

                        <select onChange={this.studentCampus}>
                        <option>Select Campus</option>
                        {
                            campuses && campuses.map(campus => {
                                return (
                                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                                )
                            })
                        }
                        </select>

                        <button>Update</button>
                    </form>
                </div>
          </div>
        )
    }
}

//<input onChange={} value={}/>