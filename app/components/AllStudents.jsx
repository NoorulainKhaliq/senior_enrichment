import React, { Component } from 'react';
import axios from 'axios';

export default class AllStudents extends Component {
    constructor() {
        super()
        this.state = {
            allStudents: []
        }
    }

    componentDidMount() {
        axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.setState({allStudents: students})
        })
    }

    render() {
        const students = this.state.allStudents;
        console.log(students)
        return(
            <div>
                {
                    students.map((student, idx) => {
                        return (
                            <div key={idx}>
                                <ul>
                                    <li>{student.name}</li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}