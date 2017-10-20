import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom'


export default class AllStudents extends Component {
    constructor(props) {
        super()
        this.state = {
            students: []
        }
        this.deleteThisStudent = this.deleteThisStudent.bind(this);
    }

    componentDidMount() {
        axios.get('/api/student')
            .then(res => res.data)
            .then(students => {
                this.setState({ students })
            })
    }

    deleteThisStudent(event) {
        const id = event.target.value;
        console.log(id)
        const value = this.state.students.filter(student => student.id !== Number(id))
        this.setState({ students: value })
        axios.delete(`/api/student/${id}`)
    }

    render() {
        const students = this.state.students;
        console.log(this.state.students)
        return (
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