import React, { Component } from 'react';
import campusService from './campus-service'
import {NavLink} from 'react-router-dom'


export default class SingleCampus extends Component{
    constructor(props) {
        super(props)
        this.state = {campus: {}}
    }

    componentWillMount() {
        campusService.getCampus(this.props.match.params.campusId)
        .then(campus => this.setState({campus}))
    }


    render() {
        const campus = this.state.campus;
        const students = campus.students ? campus.students : {};
          return (
            <div>
                <h3>{campus.name}</h3>
                <div><img height='50%' width='50%' src={campus.imageUrl}/></div>
                <ul>
                    {
                        campus.students && campus.students.map((student, idx) => {return (
                            <NavLink to={`/student/${student.id}`} key={idx}>
                                <li>{student.name}</li>
                            </NavLink>
                        )})
                    }
                </ul>
                <NavLink to={'/student/newStudent'}>
                    <button>Add Student</button>
                </NavLink>
            </div>
        )
    }
}