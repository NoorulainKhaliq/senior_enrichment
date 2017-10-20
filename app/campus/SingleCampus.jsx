import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios'


export default class SingleCampus extends Component {
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

    //loads the single campus page depending on campusId
    componentDidMount() {
        const campusId = this.props.match.params.campusId
        axios.get(`/api/campus/${campusId}`)
            .then(res => res.data)
            .then(campus => this.setState({ campus, students: campus.students }))
            .catch(err => {
                this.props.history.push('/campus')
            })
    }

    //since single campus also shows the students associated with the campus,
    //i have a remove button next to each student to delete on it
    deleteStudent(event) {
        const id = event.target.value
        const students = this.state.students.filter(student => student.id !== Number(id))
        this.setState({ students })
        axios.delete(`/api/student/${id}`)
    }
    //the update form is on the single campus page to change information of the campus
    updateCampus(event) {
        event.preventDefault();
        const id = this.state.campus.id
        const campusToUpdate = {
            name: this.state.newName,
            imageUrl: this.state.newImg
        }
        axios.put(`/api/campus/${id}`, campusToUpdate)
            .then(res => res.data)
            .then(updatedCampus => {
                this.setState({ campus: updatedCampus })
            })
    }

    //functions to set the state depending on user options
    campusName(event) {
        const name = event.target.value
        this.setState({ newName: name })
    }

    campusImg(event) {
        const campusImg = event.target.value
        this.setState({ newImg: campusImg })
    }

    render() {
        const campus = this.state.campus;
        const students = this.state.students;
        return (
            <div>
                <h3>{campus.name}</h3>
                <div><img height='30%' width='30%' src={campus.imageUrl} /></div>
                <ul>
                    {
                        students && students.map((student, idx) => {
                            return (
                                <div key={student.id}>
                                    <NavLink to={`/student/${student.id}`} key={student.id}>
                                        <li>{student.name}</li></NavLink>
                                    <button onClick={this.deleteStudent} value={student.id}>Remove</button>
                                </div>
                            )
                        })
                    }
                </ul>
                {/* students appear as link in the event someone wants to navigate to the student*/}
                <NavLink to={'/student/newStudent'}>
                    <button>Add Student</button>
                </NavLink>
                {/*form to update campus from the single campus*/}
                <div className='text-center'>
                    <form onSubmit={this.updateCampus}>
                        <legend>Update Campus</legend>
                        <input onChange={this.campusName} value={this.state.newName} placeholder='enter campus Name' />
                        <input onChange={this.campusImg} value={this.state.newImg} placeholder='enter new image' />
                        <button>Update</button>
                    </form>
                </div>
            </div>
        )
    }
}

//the student components follow the same format