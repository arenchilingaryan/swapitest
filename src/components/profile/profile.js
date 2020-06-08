import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import './profile.css'
import { setProfile } from '../../reducer/profile-reducer'

const ProfilePage = (props) => {
    const { name, height, mass, hair_color, eye_color, birth_year, gender } = props.profile
    const { id } = useParams()
    

    useEffect(() => {
        axios.get(`http://swapi.dev/api/people/${id}/`).then(res => props.setProfile(res.data))
    }, [])

    return (
        <div className="profile__page">
            <NavLink className="profile__btn" to="/">
                <img className="profile__img" alt="sorry bro :'(" src="https://thypix.com/wp-content/uploads/2020/04/white-arrow-21-700x368.png" />
                <button className="profile__backtoHome">Back to home</button>
            </NavLink>
            <div className="profile__container">
                <ul>
                    <li className="profile__item"><strong>Name: </strong>&nbsp; {name} </li>
                    <li className="profile__item"><strong>Gender:</strong> &nbsp; {gender} </li>
                    <li className="profile__item"><strong>Birth Year:</strong>&nbsp; {birth_year} </li>
                    <li className="profile__item"><strong>Height:</strong>&nbsp; {height} </li>
                    <li className="profile__item"><strong>Mass:</strong>&nbsp; {mass} </li>
                    <li className="profile__item"><strong>Eye Color:</strong>&nbsp; {eye_color} </li>
                    <li className="profile__item"><strong>Hair Color:</strong>&nbsp; {hair_color} </li>
                </ul>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        profile: state.profile.profile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setProfile: (profileData) => dispatch(setProfile(profileData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)