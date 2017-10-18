import React, { Component } from 'react';
import axios from 'axios';
import {NavLink, Link} from 'react-router-dom'
import studentService from '../services/student-service'
import campusService from '../services/campus-service'


//be able to add and remove students from here

export default class AllStudents extends Component {
    constructor(props) {
        super()
        this.state = {
            allStudent:[],
            campuses: [],
            newStudentEmail: "",
            newStudentName: "",
            selectedCampus: ""
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.deleteThisStudent = this.deleteThisStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.studentName = this.studentName.bind(this);
        this.studentEmail = this.studentEmail.bind(this);
        this.studentCampus = this.studentCampus.bind(this);
    }

    componentWillMount() {
        studentService.getAllStudents()
        .then(allStudents => {
            this.setState({allStudents})
        })
        campusService.getAllCampuses()
        .then(allCampuses => {
            this.setState({campuses: allCampuses})
        })
    }

    handleOnClick(event){
        event.preventDefault();
        //the id of the student we want to delete
        console.log(event.target.value) 
    }

    deleteThisStudent(event) {
        //try to rerender dom immediately to reflect the changes made
        const id = event.target.value;
        axios.delete(`/api/student/${id}`)
    }

    addStudent() {
        axios.post('/api/student/newStudent', {
            name: this.state.newStudentName,
            email: this.state.newStudentEmail,
            campusId: this.state.selectedCampus
        })
    }

    studentName(event) {
        const name = event.target.value
        this.setState({newStudentName: name})
    }

    studentEmail(event) {
        const email = event.target.value
        this.setState({newStudentEmail: email})
    }

    studentCampus(event) {
        const campus = event.target.value
        this.setState({selectedCampus: campus})
    }

    render() {
        const students = this.state.allStudents;
        const campuses = this.state.campuses;
        return(
            <div>
            <table className="table" >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Campus</th>
                    <th>Remove</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                    {
                        students && students.map((student, idx) => {
                            return (
                                <tr key={idx}>
                                    <NavLink to={`/student/${student.id}`}><td>{student.name}</td></NavLink>
                                    <td>{student.campus.name}</td>
                                    <td>
                                    <button onClick={this.deleteThisStudent} value={student.id} type="button" className="btn btn-secondary btn-sm">Remove</button>
                                    </td>
                                    <td>
                                    <button onClick={this.handleOnClick} value={student.id} type="button" className="btn btn-secondary btn-sm">Update</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* add a student*/}
            <div>
                <form onSubmit={this.addStudent}>
                <legend>Add a Student</legend>
                <input onChange={this.studentName} type="text" name="name" placeholder='enter name'/>
                <input onChange={this.studentEmail} type="text" name="email" placeholder='enter email'/>
                <select
                    className="form-control"
                    name="campusId"
                    required
                    onChange={this.studentCampus}>
                    {
                    campuses && campuses.map((campus, idx) => (
                        <option key={idx} value={campus.id}>{campus.name}</option>
                    ))
                    }
                </select>
                    <button type='submit'>ADD</button>
                </form>
            </div>

            </div>
        )
    }
}

//add onclick functionality to the button so that the student is removed and the removal is reflected
//on the page. 