const initialState = {
    history : []
}

export const addHistory = (character) => ({type: 'ADD_HISTORY', character })

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY': {
            const historyArr = [ ...state.history, action.character ]
            return {
                history: historyArr
            }
        }
        default: {
            return state
        }
    }
}