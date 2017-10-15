import React, { Component } from 'react';
import axios from 'axios';

const style = {width: '100px'}

export default class Header extends Component {

    render() {
        return (
            <div>
                    <header>
                        <div className="pull-right">
                            <button type="button" className="btn btn-primary btn-lg">Home</button>
                            <button type="button" className="btn btn-secondary btn-lg">Student</button>
                        </div>
                    </header>
                <hr></hr>
            </div>
        )
    }
 }


         //   <div className="campus-view">
        //     {
        //         campuses && campuses.map((campus, idx) => {
        //             return (
        //                 <div className="column" key={idx}>
        //                     <img src={campus.imageUrl}/>
        //                     <span className="h6">{campus.name}</span>
        //                 </div>
        //             )
        //         })
        //     }
        //   </div>