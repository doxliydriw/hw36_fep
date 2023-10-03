import { createStore } from 'redux'


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