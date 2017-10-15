import React, { Component } from 'react';
import axios from 'axios';

export default class AllStudents extends Component {
    constructor() {
        super()
        this.state = {
            allStudents = []
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
        console.log(this.state.allStudents)
        return(
            <div><h1>Hey</h1></div>
        )
    }
}