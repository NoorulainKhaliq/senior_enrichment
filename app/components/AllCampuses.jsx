import React, { Component } from 'react';
import axios from 'axios';

export default class AllCampuses extends Component {

    


    render() {
        const campuses = this.props.campuses;
        return (
            <div className="col-xs-10">
                <div className="row">
            {
                campuses && campuses.map((campus, idx)=>{
                    return (
                        <div className="col-xs-4" key={idx}>
                            <a onClick={() => {this.props.selectedCampus(campus.id)}} className="thumbnail" href="#">
                            <img src={campus.imageUrl}/>
                            <div className={"caption"}>
                                <h5>
                                    <span>{campus.name}</span>
                                </h5>
                            </div>
                            </a>
                        </div>
                    )
                })
            }
                </div>
            </div>
        )
    }
}