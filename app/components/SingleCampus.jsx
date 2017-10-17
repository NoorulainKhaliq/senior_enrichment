import React, { Component } from 'react';
import axios from 'axios';
import campusService from '../services/campus-service'
import {NavLink} from 'react-router-dom'


export default class SingleCampus extends Component{
    constructor(props) {
        super(props)
        this.state = {campus: {}}
    }

    // componentDidMount() {
    //     campusService.getCampus(this.props.match.params.campusId)
    //     .then(campus => this.setState({campus: campus}))
    // }
    
    componentDidMount() {
        axios.get(`/api/campus/${this.props.match.params.campusId}`)
        .then(res => res.data)
        .then(campus => this.setState({campus}))
    }


    render() {
        const campus = this.state.campus;
        const students = campus.students;
          return (
            <div>
                <h3>{campus.name}</h3>
                <ul>
                    {
                        campus.students && campus.students.map((student, idx) => {return (
                            <NavLink to={`/student/${student.id}`} key={idx}>
                                <li>{student.name}</li>
                            </NavLink>
                        )})
                    }
                </ul>
            </div>
        )
    }
}