import { combineReducers } from 'redux'
import { historyReducer } from './history-reducer'
import { profileReducer } from './profile-reducer'
import { searchReducer } from './search-reducer'


export default combineReducers({
    history: historyReducer,
    profile: profileReducer,
    search: searchReducer
})
