import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import campusService from '../services/campus-service'

export default class AllCampuses extends Component {
    constructor(props) {
        super()
        this.state = {allCampuses:[]}
    }

    componentWillMount() {
        campusService.getAllCampuses()
        .then(allCampuses => 
            this.setState({allCampuses})
        ) 
    }

    render() {
        const campuses = this.state.allCampuses;
        return (
            <div className="col-xs-10">
                <div className="row">
                {
                    !campuses && <div>Loading...</div>
                }
            {
                
                campuses && campuses.map((campus, idx)=>{
                    return (
                        <div className="col-xs-10" key={idx}>
                            <NavLink to={`/campus/${campus.id}`}>
                            <img src={campus.imageUrl} width='50%' height='50%'/>
                            <div className={"caption"}>
                                <h5>
                                    <span>{campus.name}</span>
                                </h5>
                            </div>
                            </NavLink>
                        </div>
                    )
                })
            }
                </div>
            </div>
        )
    }
}