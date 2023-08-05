import { Note } from "../interfaces";
import { ActionTypes } from "../action-types";
import { Dispatch } from "redux";

export type NoteAction = {
    type: ActionTypes.STORE;
    payload: Note;
}

export type NoteDeleteAction = {
    type: ActionTypes.DELETE;
    payload: Note;
}

export type Action = NoteAction | NoteDeleteAction;

export const addNotes = (note: Note) => {
    return ( dispatch: Dispatch<Action> ) => {
        dispatch({
            type: ActionTypes.STORE,
            payload: note,
        })
    }
};

export const deleteNotes = (note: Note) => {
    return ( dispatch: Dispatch<Action> ) => {
        dispatch({
            type: ActionTypes.DELETE,
            payload: note,
        })
    }
};

export default addNotes;