import React, { useState, useEffect } from 'react'
import { addHistory, setHistory } from '../../reducer/history-reducer'
import { setProfile } from '../../reducer/profile-reducer'
import { addResult, addSearch } from '../../reducer/search-reducer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './main.css'

const MainPage = props => {
    const [search, setSearch] = useState('')
    const history = useHistory()

    useEffect(() => {
        const historyArr = localStorage.getItem('history')
        if (historyArr) {
            props.setHistory(JSON.parse(historyArr))
        }
    }, [])

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/?search=${search}`).then(data => props.addSearch(data.data.results))
    }, [search])

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(props.history))
    }, [props.history])

    const searchHandler = async (e) => {
        setSearch(e.target.value)
    }

    const setProfileHandler = async (characterUrl) => {
        try {
            const data = await axios.get(characterUrl)
            props.addHistory(data.data.name)
            setSearch('')
            const middlewareId = characterUrl.substring(28)
            const idx = middlewareId.substring(0, middlewareId.length - 1)
            history.push(`/profile/${idx}`)
        } catch (e) {
            throw new Error(e)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.get(`https://swapi.dev/api/people/?search=${search}`)
            props.addResultSearch(data.data.results)
            setSearch('')
        } catch (e) {
            throw new Error(e)
        }
    }


    return (
        <div className="main__wrapper">
            <div className="search__container">
                <form className="search__form" onSubmit={submitHandler}>
                    <div className="input">
                        <input onChange={searchHandler} value={search} className="search__input" type="text" placeholder="search..." name="search" autoComplete="off" />
                        <span className="input__border"></span>
                        <ul className="search__autocomplete" style={search ? { display: 'block' } : { display: 'none' }}>
                            {
                                props.search.search.map(el => {
                                    return (
                                        <li key={el.created} onClick={() => setProfileHandler(el.url)} className="search__item-link">
                                            {el.name}
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    <button className="search__btn">Search</button>
                </form>
                <ul className="search__result" style={props.search.result.length ? { display: 'block' } : { display: 'none' }}>
                    {
                        props.search.result.map(el => {
                            const idx = props.search.result.indexOf(el)
                            return (
                                <li onClick={() => setProfileHandler(el.url)} className="result__item" key={el.created}>
                                    <strong>{idx + 1}.</strong>
                                    <span className="item-inside"> {el.name} </span>
                                    <span className="item-inside"> {el.gender} </span>
                                    <span className="item-inside"> {el.birth_year} </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="history__container">
                {
                    props.history.length
                        ? props.history.map(el => {
                            const idx = props.history.indexOf(el)
                            return (
                                <p key={idx}> {el} </p>
                            )
                        })
                        : <h2>History is empty</h2>
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        search: state.search,
        history: state.history.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addHistory: (character) => dispatch(addHistory(character)),
        setHistory: (arr) => dispatch(setHistory(arr)),
        setProfile: (profileData) => dispatch(setProfile(profileData)),
        addResultSearch: (result) => dispatch(addResult(result)),
        addSearch: (search) => dispatch(addSearch(search))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
