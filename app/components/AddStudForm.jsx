import React, { Component } from 'react';
//import studentService from '../services/student-service'
//import campusService from '../services/campus-service'
import axios from 'axios';

export default class StudentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: [],
      newStudentEmail: "",
      newStudentName: "",
      selectedCampus: ""
    }

    this.addStudent = this.addStudent.bind(this);
    this.studentName = this.studentName.bind(this);
    this.studentEmail = this.studentEmail.bind(this);
    this.studentCampus = this.studentCampus.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campus')
      .then(res => res.data)
      .then(allCampuses => {
        this.setState({ campuses: allCampuses })
      })
  }

  addStudent(event) {
    event.preventDefault();
    console.log('from add student', this.state.selectedCampus)
    axios.post('/api/student/newstudent', {
      name: this.state.newStudentName,
      email: this.state.newStudentEmail,
      campusId: this.state.selectedCampus
    })
      .then(createdStudent => { alert(createdStudent.data.name + ' added!') })
      .then(this.props.history.push(`/campus/${this.state.selectedCampus}`))
  }

  studentName(event) {
    const name = event.target.value
    this.setState({ newStudentName: name })
  }

  studentEmail(event) {
    const email = event.target.value
    this.setState({ newStudentEmail: email })
  }
  studentCampus(event) {
    const campus = event.target.value
    this.setState({ selectedCampus: Number(campus) })
    console.log('this is id', campus)
  }

  render() {
    const campuses = this.state.campuses;
    return (
      <div>
        <form onSubmit={this.addStudent}>
          <legend>Add a Student</legend>
          <input onChange={this.studentName} type="text" name="name" placeholder='enter name' />
          <input onChange={this.studentEmail} type="text" name="email" placeholder='enter email' />
          <select
            className="form-control"
            name="campusId"
            required
            onChange={this.studentCampus}>
            {
              campuses && campuses.map((campus, idx) => (
                <option key={idx} value={campus.id}>{campus.name}</option>
              ))
            }
          </select>
          <button type="submit" className="button-main">Add Campus</button>
        </form>
      </div>
    )
  }
}