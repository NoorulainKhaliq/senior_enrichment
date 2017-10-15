import React, { Component } from 'react';
import axios from 'axios';


export default class AllCampuses extends Component{
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <ul>
                    {
                     this.props.selectedCampus.map((student, idx)=> {
                         return (
                             <li key={idx}>{student.name}</li>
                         )
                     }) 
                    }
                </ul>
            </div>
        )
    }

}