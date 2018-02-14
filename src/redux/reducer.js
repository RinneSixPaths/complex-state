import {initialState} from './initialState';

export default function toDoListReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_CURRENT_USER': {
            return {
                ...state,
                currentUser: {...action.payload}
            }
        }
        
        case 'REMOVE_CURRENT_USER': {
            return {
                ...state,
                currentUser: ''
            }
        }
        
        default: {
            return state;
        }
    }
}