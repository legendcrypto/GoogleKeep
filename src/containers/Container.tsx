import React from 'react';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import { Action } from '../state/actions';
import { actionCreators } from '../state';
import ShowNotes from './ShowNotes';

const Container = () => {
    const dispatch: Dispatch<Action> = useDispatch();
    const { addNotes, deleteNotes } = bindActionCreators(actionCreators, dispatch);
    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <Input addNotes={addNotes} />
                    <ShowNotes deleteNotes={deleteNotes} addNotes={addNotes} />
                </div>
            </div>
        </>
    );
};

export default Container;