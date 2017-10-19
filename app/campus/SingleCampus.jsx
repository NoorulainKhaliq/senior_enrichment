import React, { Component } from 'react';
import campusService from './campus-service'
import {NavLink} from 'react-router-dom'
import studentService from '../services/student-service'
import axios from 'axios'


export default class SingleCampus extends Component{
    constructor(props) {
        super(props)
        this.state = {
            campus: {},
            students: [],
            newName: "",
            newImg: ""
        }
        this.deleteStudent = this.deleteStudent.bind(this)
        this.updateCampus = this.updateCampus.bind(this)
        this.campusName = this.campusName.bind(this)
        this.campusImg = this.campusImg.bind(this)
    }

    componentWillMount() {
        campusService.getCampus(this.props.match.params.campusId)
        .then(campus => this.setState({campus, students: campus.students}))
    }

    //remove students and have it reflect on the dom
    deleteStudent(event){
        const id = event.target.value
        const students = this.state.students.filter(student => student.id !== Number(id))
        this.setState({students})
        axios.delete(`/api/student/${id}`)
    }

    updateCampus(event) {
        event.preventDefault();
        const id = this.state.campus.id
        const campusToUpdate = {
            name: this.state.newName,
            imageUrl: this.state.newImg
        }
        // axios.put(`/api/campus/${id}`, {
        //     name: this.state.newName,
        //     imageUrl: this.state.newImg
        // })
        campusService.updateCampus(campusToUpdate)
            .then(updatedCampus => this.setState({
                campus: updatedCampus
            }))
    }

    campusName(event) {
        const name = event.target.value
        this.setState({newName: name})
    }
    campusImg(event) {
        const campusImg = event.target.value
        this.setState({newImg: campusImg})
    }

    render() {
        const campus = this.state.campus;
        //const students = campus.students ? campus.students : {};
        const students = this.state.students;
        console.log(this.state.students)
          return (
            <div>
                <h3>{campus.name}</h3>
                <div><img height='30%' width='30%' src={campus.imageUrl}/></div>
                <ul>
                    {
                        students && students.map((student, idx) => {return (
                            <div key={student.id}>
                                <NavLink to={`/student/${student.id}`} key={idx}>
                                    <li>{student.name}</li></NavLink> 
                                    <button onClick={this.deleteStudent} value={student.id}>Remove</button>
                            </div>
                        )})
                    }
                </ul>

                <NavLink to={'/student/newStudent'}>
                    <button>Add Student</button>
                </NavLink>

                <div className='text-center'>
                    <form onSubmit={this.updateCampus}>
                        <legend>Update Campus</legend>
                        <input onChange={this.campusName} value={this.state.newName} placeholder='enter campus Name'/>
                        <input onChange={this.campusImg} value={this.state.newImg} placeholder='enter new image'/>
                        <button>Update</button>
                    </form>
                </div>
            </div>
        )
    }
}