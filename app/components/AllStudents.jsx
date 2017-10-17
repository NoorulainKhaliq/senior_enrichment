import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import studentService from '../services/student-service'

//be able to add and remove students from here

export default class AllStudents extends Component {
    constructor(props) {
        super()
        this.state = {allStudent:[]}
    }

    componentWillMount() {
        studentService.getAllStudents()
        .then(allStudents => {
            this.setState({allStudents})
        })
    }

    render() {
        const students = this.state.allStudents; //array of objects
        return(
            <div>
            <table className="table" >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Campus</th>
                </tr>
                </thead>
                <tbody>
                    {
                        students && students.map((student, idx) => {
                            return (
                                <tr key={idx}>
                                    <NavLink to={`/student/${student.id}`}>
                                        <td>{student.name}</td>
                                    </NavLink>
                                    <td>{student.campus.name}
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

