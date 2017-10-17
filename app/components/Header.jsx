import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const style = {width: '100px'}

export default class Header extends Component {

    render() {
        return (
            <div>
                    <header>
                        <div className="pull-right">
                            <Link to='/'>
                            <button type="button" className="btn btn-primary btn-lg">Home</button>
                            </Link>
                            <Link to='/students'>
                            <button type="button" className="btn btn-secondary btn-lg">Students</button>
                            </Link>
                            <Link to='/campus'>
                            <button type="button" className="btn btn-secondary btn-lg">Campuses</button>
                            </Link>
                        </div>
                    </header>
                <hr></hr>
            </div>
        )
    }
 }