import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import store, { fetchCampus, updateCampus, fetchStudents } from '../store'


export default class SingleCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            imageUrl: ""
        }

        this.updateCampus = this.updateCampus.bind(this);
        this.campusName = this.campusName.bind(this);
        this.campusImg = this.campusImg.bind(this)
    }

    //loads the single campus page depending on campusId
    componentDidMount() {
        const campusId = this.props.match.params.campusId
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        })
        const fetchCampusThunk = fetchCampus(campusId);
        const fetchStudentsThunk = fetchStudents();
        store.dispatch(fetchCampusThunk);
        store.dispatch(fetchStudentsThunk);

    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    updateCampus(event) {
        event.preventDefault();
        const id = this.props.match.params.id
        const content = {
            name: this.state.name,
            imageUrl: this.state.imageUrl
        }
        const updateCampusThunk = updateCampus(id, content)
        store.dispatch(updateCampusThunk)
    }

    campusName(event) {
        const name = event.target.value;
        this.setState({ name })
    }
    campusImg(event) {
        const imageUrl = event.target.value;
        this.setState({ imageUrl })
    }



    render() {
        //const campus = this.state.campus;
        const campus = store.getState().campus
        const students = store.getState().students.filter(student => student.campusId === campus.id)
        return (
            <div>
                <h3>{campus.name}</h3>
                <div><img height='30%' width='30%' src={campus.imageUrl} /></div>
                <ul>
                    {
                        students && students.map((student, idx) => {
                            return (
                                <div key={student.id}>
                                    <NavLink to={`/student/${student.id}`} key={student.id}>
                                        <li>{student.name}</li></NavLink>
                                    <button onClick={this.deleteStudent} value={student.id}>Remove</button>
                                </div>
                            )
                        })
                    }
                </ul>
                {/* students appear as link in the event someone wants to navigate to the student*/}
                <NavLink to={'/student/newStudent'}>
                    <button>Add Student</button>
                </NavLink>

                {/*form to update campus from the single campus*/}
                <div className='text-center'>
                    <form onSubmit={this.updateCampus}>
                        <legend>Update Campus</legend>
                        <input
                            onChange={this.campusName}
                            value={this.state.name}
                            placeholder='enter campus Name'
                        />
                        <input
                            onChange={this.campusImg}
                            value={this.state.imageUrl}
                            placeholder='enter new image'
                        />
                        <button>Update</button>
                    </form>
                </div>
            </div>
        )
    }
}

//the student components follow the same format

//    updateCampus(event) {
//     event.preventDefault();
//     const id = this.state.campus.id
//     const campusToUpdate = {
//         name: this.state.newName,
//         imageUrl: this.state.newImg
//     }
//     axios.put(`/api/campus/${id}`, campusToUpdate)
//         .then(res => res.data)
//         .then(updatedCampus => {
//             this.setState({ campus: updatedCampus })
//         })
// }

// //functions to set the state depending on user options
// campusName(event) {
//     const name = event.target.value
//     this.setState({ newName: name })
// }

// campusImg(event) {
//     const campusImg = event.target.value
//     this.setState({ newImg: campusImg })
// }