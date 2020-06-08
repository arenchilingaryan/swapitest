import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import MainPage from '../search/main'
import ProfilePage from '../profile/profile'
import Header from '../header/header'
import './app.css'



const App = () => {
    return (
        <Fragment>
            <Header />
            <Route path="/" exact component={MainPage} />
            <Route path="/profile/:id" component={ProfilePage} />
        </Fragment>
    )
}
export default App;