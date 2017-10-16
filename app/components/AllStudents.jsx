import React, { Component } from 'react';
import axios from 'axios';

//be able to add and remove students from here

export default class AllStudents extends Component {
    constructor(props) {
        super()
    }

    render() {
        const students = this.props.students; //array of objects
        const campuses = this.props.allCampuses; //array of objects
        return(
            <div>
            <table className="table" >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Campus</th>
                </tr>
                </thead>
                <tbody>
                    {
                        students && students.map((student, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>
                                        {
                                            campuses && campuses.find(campus => campus.id === student.campusId).name
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>  
            </div>
        )
    }
}