const initialState = {
    search: [],
    result: []
}

export const addResult = (result) => ({ type: 'ADD_RESULT', result })
export const addSearch = (search) => ({ type: 'ADD_SEARCH', search })


export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RESULT': {
            return {
                search: [],
                result: action.result
            }
        }
        case 'ADD_SEARCH': {
            return {
                ...state,
                search: action.search
            }
        }
        default: {
            return state
        }
    }
}