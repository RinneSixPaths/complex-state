//Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export const setCurrentUser = userData => ({
    type: SET_CURRENT_USER,
    payload: userData
});

export const removeCurrentUser = _ => ({
    type: REMOVE_CURRENT_USER
})