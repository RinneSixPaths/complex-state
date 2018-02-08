import toDoListReducer from './reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import thunk from 'redux-thunk';

const searchCategoryName = store => next => action => {
    console.log(action);
    /*let newArr = store.getState().categories.map((key) => {
        if (key.categoryName == action.payload.target) key.persons.push(action.payload.newName);
        return key;
    });
    console.log(newArr);*/
    /*action.payload = {
        categoryName: 'Elfs',
        persons: [{name: 'bosmer'}, 
                  {name: 'altmer'}, 
                  {name: 'dunmer'}]
    }*/
    next(action);
}

export const store = createStore(
    toDoListReducer,
    composeWithDevTools(applyMiddleware(thunk, searchCategoryName))
);

window.store = store;