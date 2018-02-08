const initialState = {
    categories: [{
        categoryName: 'Dragons',
        persons: [{name: 'odaving'}, 
                {name: 'parturnaks'}, 
                {name: 'alduin'}]
    }, {
        categoryName: 'Priests',
        persons: [{name: 'krosis'},
                {name: 'morokei'},
                {name: 'zaan'}]
    }, {
        categoryName: 'Daedra',
        persons: [{name: 'molag bal'},
                {name: 'haermaus mora'}, 
                {name: 'mehrunes dagon'}]
    }]
};

export default function toDoListReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_NAME': {
            console.log(state.categories.inde)
            return {
                ...state,
                categories: [...state.categories]
            }
        }
        
        default: {
            return state;
        }
    }
}