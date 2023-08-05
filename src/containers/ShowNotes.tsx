import React from 'react';
import { Action, deleteNotes } from '../state/actions';
import { Dispatch } from 'redux';
import { Note } from '../state/interfaces';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import Cards from '../components/Cards';
import { InputProps } from '../components/Input';

interface ShowInputProps extends InputProps{
    deleteNotes: (note: Note) => (dispatch: Dispatch<Action>) => void;
}

const ShowNotes = (props: ShowInputProps) => {
    const { addNotes, deleteNotes } = props;
    const notes = useSelector((state: RootState) => state.notes);
    return (
        <>
            <Cards isPinned={true} addNotes={addNotes} deleteNotes={deleteNotes} notes={notes}/>
            <Cards isPinned={false} addNotes={addNotes} deleteNotes={deleteNotes} notes={notes}/>
        </>
    );
};

export default ShowNotes;