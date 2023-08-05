import { combineReducers } from "redux";
import NotesReducer from "./notesReducer";

const reducers = combineReducers({
    notes: NotesReducer
})

export default reducers;