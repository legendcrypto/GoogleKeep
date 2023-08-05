import { Note } from "../interfaces";
import { Action } from "../actions";
import { ActionTypes } from "../action-types";
  
const initialState: Note[] = [];

const reducer = (state: Note[] = initialState, action: Action) => {
    switch(action.type){
        case ActionTypes.STORE:
            const payload: Note = {
                title: action.payload.title,
                description: action.payload.description,
                isPinned: action.payload.isPinned,
                color: action.payload.color
            }
            const newState: Note[] = state.filter(obj => JSON.stringify(obj) != JSON.stringify(payload));
            if ('makePinned' in action.payload) {
                payload.isPinned = action.payload.makePinned ? true : false;
                return [...newState, payload];
            }
            else if('newColor' in action.payload) {
                payload.color = action.payload.newColor ? action.payload.newColor : payload.color;
                return [...newState, payload];
            }
            return [...state, action.payload];
        case ActionTypes.DELETE:
            return state.filter(obj => JSON.stringify(obj) != JSON.stringify(action.payload));
        default:
            return state;
    }
};

export default reducer;