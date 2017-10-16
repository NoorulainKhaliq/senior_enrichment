import React, { Component } from 'react';
import axios from 'axios';


export default class SingleCampus extends Component{
    constructor(props) {
        super()
        this.state ={
            allStudents : [],
            selectedCampus: ""
        }
    }
    
    componentWillMount(){
        axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.setState({allStudents: students})
        })
        axios.get(`/api/campus/${this.props.match.params.campusId}`)
        .then(res => res.data)
        .then(campus => {
            this.setState({selectedCampus: campus })
        })
    }

    render() {
        const campusId = this.props.match.params.campusId
        const students = this.state.allStudents
        const filteredStudents = students.filter(student => student.campusId == campusId)
        const campusName = this.state.selectedCampus.name;
          return (
            <div>
                <h2>{campusName}</h2>
                <ul>
                    {
                     filteredStudents && filteredStudents.map((student, idx)=> {
                        
                         return (
                             <li key={idx}>
                             {student.name}
                             </li>
                         )
                     }) 
                    }
                </ul>
            </div>
        )
    }
}