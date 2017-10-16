import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'

export default class AllCampuses extends Component {
    constructor(props) {
        super()
    }

    render() {
        const campuses = this.props.campuses;
        return (
            <div className="col-xs-10">
                <div className="row">
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