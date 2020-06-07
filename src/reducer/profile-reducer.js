const initialState = {
    profile: {}
}

export const setProfile = (profile) => ({type: 'SET_PROFILE', profile })

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE': {
            return {
                profile: action.profile
            }
        }
        default: {
            return state
        }
    }
}