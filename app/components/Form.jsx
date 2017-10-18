import React, {Component} from 'react';
import studentService from '../services/student-service'


export default class Form extends Component{
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      campus: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  render() {
      return(
        <form onSubmit={this.handleSubmit}>
            <div>
            <input type="text" name="email" />
              <legend>Add a Student</legend>
                <label>Name <input type="text" onChange={this.handleChange}/></label>
                  <br />
                <label>Email <input type="text" onChange={this.handleChange}/></label>
                  <br/>
                <label>Campus <input type="text" onChange={this.handleChange}/></label>
            </div>
          <button type="submit" className="btn btn-success">Add!</button>
        </form>
      ) 
    }
}