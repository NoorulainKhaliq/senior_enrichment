import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header'
import AllCampuses from './AllCampuses';

export default class Main extends Component {
    constructor(props) {
        super()
    }


    render() {
        return (
            <div>
                <Header />
                <AllCampuses />
            </div>  
        )
    }
}