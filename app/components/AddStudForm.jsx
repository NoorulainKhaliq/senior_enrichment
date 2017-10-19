import React, {Component} from 'react';
import studentService from '../services/student-service'
import campusService from '../services/campus-service'
import axios from 'axios';

export default class StudentForm extends Component{
  constructor() {
    super()
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

  componentWillMount() {
    campusService.getAllCampuses()
    .then(allCampuses => {
        this.setState({campuses: allCampuses})
    })
}

  addStudent(event) {
    event.preventDefault();
    axios.post('/api/student/newStudent', {
        name: this.state.newStudentName,
        email: this.state.newStudentEmail,
        campusId: this.state.selectedCampus
    })
    .then(createdStudent => {alert('new student added!')})
}
  
  studentName(event) {
    const name = event.target.value
    this.setState({newStudentName: name})
}

studentEmail(event) {
    const email = event.target.value
    this.setState({newStudentEmail: email})
}
studentCampus(event) {
  const campus = event.target.value
  this.setState({selectedCampus: campus})
}

  render() {
    const campuses = this.state.campuses;
      return(
        <div>
        <form onSubmit={this.addStudent}>
        <legend>Add a Student</legend>
        <input onChange={this.studentName} type="text" name="name" placeholder='enter name'/>
        <input onChange={this.studentEmail} type="text" name="email" placeholder='enter email'/>
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
            <button type='submit'>ADD</button>
        </form>
    </div>
      ) 
    }
}