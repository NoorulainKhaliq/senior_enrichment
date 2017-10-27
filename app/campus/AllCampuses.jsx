import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import store, { fetchCampuses, destroyCampus, createCampus } from '../store'

export default class AllCampuses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            imageUrl: ""
        };
        this.addCampus = this.addCampus.bind(this);
        this.campusName = this.campusName.bind(this);
        this.campusImg = this.campusImg.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            return this.setState(store.getState())
        })
        const fetchCampusesThunk = fetchCampuses();
        store.dispatch(fetchCampusesThunk)
    }

    componentWIllUnmount() {
        this.unsubscribe();
    }

    deleteCampus(evt) {
        const id = evt.target.value;
        const destroyCampusThunk = destroyCampus(id);
        store.dispatch(destroyCampusThunk);
        store.dispatch(fetchCampuses())
    }

    addCampus(evt) {
        evt.preventDefault();
        const campusToCreate = {
            name: this.state.name,
            imageUrl: this.state.imageUrl
        }
        const createCampusThunk = createCampus(campusToCreate);
        store.dispatch(createCampusThunk)
        store.dispatch(fetchCampuses())
    }

    campusName(evt) {
        const name = evt.target.value;
        this.setState({ name })

    }

    campusImg(evt) {
        const imageUrl = evt.target.value;
        this.setState({ imageUrl })
    }


    render() {
        console.log(this.props, ' these are from props')
        const campuses = this.state.campuses;
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
                        <input
                            onChange={this.campusName}
                            value={this.state.name}
                            type="text"
                            name="campus"
                            placeholder="enter campus name"
                        />
                        <input
                            onChange={this.campusImg}
                            value={this.state.imageUrl}
                            type='text'
                            name="image"
                            placeholder="enter imgUrl"
                        />
                        <button type='submit'>ADD</button>
                    </form>
                </div>
            </div>
        )
    }
}