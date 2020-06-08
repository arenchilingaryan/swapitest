const initialState = {
    history : []
}

export const addHistory = (character) => ({type: 'ADD_HISTORY', character })
export const setHistory = (arr) => ({type: 'SET_HISTORY', arr })

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY': {
            const historyArr = [ ...state.history, action.character ]
            const newHistoryArr = [...new Set(historyArr)]
            return {
                history: newHistoryArr
            }
        }
        case 'SET_HISTORY': {
            return {
                history: action.arr
            }
        }
        default: {
            return state
        }
    }
}