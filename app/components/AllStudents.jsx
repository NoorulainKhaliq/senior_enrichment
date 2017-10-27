import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import store, { fetchStudents } from '../store'


export default class AllStudents extends Component {
    constructor(props) {
        super()
        this.state = store.getState();
    }

    //loads all students to state
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState())
        })
        const fetchStudentsThunk = fetchStudents();
        store.dispatch(fetchStudentsThunk)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const students = this.state.students;

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