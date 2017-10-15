import React, { Component } from 'react';
import axios from 'axios';

export default class AllCampuses extends Component {
    constructor() {
        super()
        this.state = {
            allCampuses: []
        }
    }

    componentDidMount() {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => {
            this.setState({allCampuses: campuses})
        })
    }

    render() {
        const campuses = this.state.allCampuses;
        return (
            <div>
                {
                    campuses && campuses.map((campus, idx) => {
                        return (
                            <div className="column" key={idx}>
                                <ul>
                                    <img src={campus.imageUrl}/>
                                    <span>{campus.name}</span>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}