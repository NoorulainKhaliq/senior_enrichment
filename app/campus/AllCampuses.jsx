import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import store from '../store'

export default class AllCampuses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allCampuses: [],
            campusName: "",
            campusImgUrl: ""
        }

        this.deleteCampus = this.deleteCampus.bind(this)
        this.imgUrl = this.imgUrl.bind(this)
        this.campusName = this.campusName.bind(this)
        this.addCampus = this.addCampus.bind(this)
    }

    //request to load state with all campuses
    componentWillMount() {
        axios.get(`/api/campus`)
            .then(res => res.data)
            .then(allCampuses =>
                this.setState({ allCampuses })
            )
    }

    //delete campus from all campuses page
    deleteCampus(event) {
        const id = event.target.value;
        //this updates the view before the deletion occurrs in the backend
        const value = this.state.allCampuses.filter(campus => campus.id !== Number(id))
        this.setState({ allCampuses: value })
        axios.delete(`api/campus/${id}`)
    }

    //this is to add a campus from the ALL CAMPUS page
    addCampus(event) {
        event.preventDefault();
        const campusToCreate = {
            name: this.state.campusName,
            imageUrl: this.state.campusImgUrl
        }

        axios.post(`api/campus`, campusToCreate)
            .then(res => res.data)
            .then(createdCampus => this.setState({
                campusName: "",
                campusImgUrl: "",
                allCampuses: [...this.state.allCampuses, createdCampus]
            }))
    }

    //functions to setstate onchange depending on user input
    campusName(event) {
        const campusName = event.target.value;
        this.setState({
            campusName
        })
    }

    imgUrl(event) {
        const campusImgUrl = event.target.value;
        this.setState({
            campusImgUrl: campusImgUrl
        })
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
                        campuses && campuses.map((campus, idx) => {
                            return (
                                <div className="col-xs-10" key={idx}>

                                    <button onClick={this.deleteCampus} value={campus.id} type="button" className="btn btn-secondary btn-sm">X</button>
                                    <NavLink to={`/campus/${campus.id}`}>
                                        <img src={campus.imageUrl} width='50%' height='50%' />
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
                <div>
                    {/* form to add a campus from the all campus page */}
                    <form onSubmit={this.addCampus}>
                        <legend>Add a Campus</legend>
                        <input onChange={this.campusName} value={this.state.campusName} type="text" name="campus" placeholder="enter campus name" />
                        <input onChange={this.imgUrl} value={this.state.campusImgUrl} type='text' name="image" placeholder="enter imgUrl" />
                        <button type='submit'>ADD</button>
                    </form>

                </div>
            </div>
        )
    }
}