import React, { Component } from 'react';
import axios from 'axios';

export default class Header extends Component {
    constructor() {
        super();
        this.state = { campus: [] }
    }

    componentDidMount() {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => {
            this.setState({campus: campuses})
        })
    }

    render() {
        const campuses = this.state.campus
        console.log(campuses)
       return (
        <div className='page-header'>
        <div className='btn-toolbar pull-right'>
          <div className='btn-group'>
            <button type='button' className='btn btn-primary'>Home</button>
            <button type='button' className='btn btn-primary'>Students</button>
          </div>
          <div className="campus-view">
            {
                campuses && campuses.map((campus, idx) => {
                    return (
                        <div className="column" key={idx}>
                            <img src={campus.imageUrl}/>
                            <span className="h6">{campus.name}</span>
                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
       );
    }
 }