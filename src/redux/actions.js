//Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = userData => ({
    type: SET_CURRENT_USER,
    payload: userData
})