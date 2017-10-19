import React, {
    Component
} from 'react';
import {
    NavLink
} from 'react-router-dom'
import campusService from './campus-service'

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

    componentWillMount() {
        campusService.getAllCampuses()
            .then(allCampuses =>
                this.setState({
                    allCampuses
                })
            )
    }

    deleteCampus(event) {
        const id = event.target.value;
        campusService.deleteCampus(id)
            .then(deleteCount => {
                campusService.getAllCampuses()
                    .then(allCampuses =>
                        this.setState({
                            allCampuses
                        })
                    )
                
            }).catch(e => {
                console.log(e)
                //TODO: handle failure!
            })

    }

    addCampus(event) {
        event.preventDefault();
        const campusToCreate = {
            name: this.state.campusName,
            imageUrl: this.state.campusImgUrl
        }
        campusService.createCampus(campusToCreate)
            .then(createdCampus => this.setState({
                campusName: "",
                campusImgUrl: "",
                allCampuses: [...this.state.allCampuses, createdCampus]
            }))
    }

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
        return ( <
            div className = "col-xs-10" >
            <
            div className = "row" > {!campuses && < div > Loading... < /div>
            } {
                campuses && campuses.map((campus, idx) => {
                    return ( <
                        div className = "col-xs-10"
                        key = {
                            idx
                        } >

                        <
                        button onClick = {
                            this.deleteCampus
                        }
                        value = {
                            campus.id
                        }
                        type = "button"
                        className = "btn btn-secondary btn-sm" > X < /button> <
                        NavLink to = {
                            `/campus/${campus.id}`
                        } >
                        <
                        img src = {
                            campus.imageUrl
                        }
                        width = '50%'
                        height = '50%' / >
                        <
                        div className = {
                            "caption"
                        } >
                        <
                        h5 >
                        <
                        span > {
                            campus.name
                        } < /span> <
                        /h5> <
                        /div> <
                        /NavLink> <
                        /div>
                    )
                })
            } <
            /div> <
            div >

            <
            form onSubmit = {
                this.addCampus
            } >
            <
            legend > Add a Campus < /legend> <
            input onChange = {
                this.campusName
            }
            value = {
                this.state.campusName
            }
            type = "text"
            name = "campus"
            placeholder = "enter campus name" / >
            <
            input onChange = {
                this.imgUrl
            }
            value = {
                this.state.campusImgUrl
            }
            type = 'text'
            name = "image"
            placeholder = "enter imgUrl" / >
            <
            button type = 'submit' > ADD < /button> <
            /form>

            <
            /div> <
            /div>
        )
    }
}