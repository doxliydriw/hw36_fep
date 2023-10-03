import { createStore } from 'redux'

export function sortedList(array) {
    console.log('we are sorting')
    return array.sort(function (a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });
};

const initialState = {
    list: []
}

function listReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LIST':
            return { list: action.payload };
        case 'ADD_ENTRY':
            return { list: action.payload };
        case 'DELETE_ENTRY':
            return { list: action.payload };
        case 'UPDATE_ENTRY':
            return { list: action.payload }
        default:
            return state
    }
}

const store = createStore(listReducer);
export default store;