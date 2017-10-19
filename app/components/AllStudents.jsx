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
            allStudent:[]
        }
        this.deleteThisStudent = this.deleteThisStudent.bind(this);
    }

    componentWillMount() {
        studentService.getAllStudents()
        .then(allStudents => {
            this.setState({allStudents})
        })
    }

    deleteThisStudent(event) {
        //try to rerender dom immediately to reflect the changes made
        const id = event.target.value;
        axios.delete(`/api/student/${id}`)
        .then(deletedStudent => {
            studentService.getAllStudents()
            .then(allStudents => {
                this.setState({allStudents})
            })
        })
    }

    render() {
        const students = this.state.allStudents;
        return(
            <div>
            <NavLink to={'/student/newStudent'}>
            <button>Add Student</button>
            </NavLink>
            <table className="table" >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Campus</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                    {
                        students && students.map((student, idx) => {
                            return (
                                <tr key={idx}>
                                    <NavLink to={`/student/${student.id}`}><td>{student.name}</td></NavLink>
                                    
                                    <td> 
                                    {student.campus ? student.campus.name : 'no campus assigned'}</td>
                                    <td>
                                    <button onClick={this.deleteThisStudent} value={student.id} type="button" className="btn btn-secondary btn-sm">Remove</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        )
    }
}