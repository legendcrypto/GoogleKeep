import React, { useRef, useState } from 'react';
import '../App.css';
import pin from '../pin.png';
import { Action } from '../state/actions';
import { Dispatch } from 'redux';
import { Note } from '../state/interfaces';
import './Input.css';

export interface InputProps {
    addNotes: (note: Note) => (dispatch: Dispatch<Action>) => void;
}

const Input = (props: InputProps) => {
    const {addNotes} = props;
    const [show, setShow] = useState(false);
    const initialState: Note = {
        title: "",
        description: "",
        isPinned: false,
        color: "#202124"
    };
    const [error, setError] = useState(false);
    const [note, setNote] = useState<Note>(initialState);
    const inputReference = useRef<HTMLInputElement>(null);
    const handleOnBlur = (e: React.FocusEvent<HTMLFormElement>) => {
        if (e.relatedTarget && ( e.target.name === "content" || e.target.name === "input-1" )) return;
        else {
            setShow(false);
            inputReference.current?.blur();
        }
    };
    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setShow(true);
    };

    const handleOnBlur2 = (e: React.FocusEvent<HTMLInputElement>) => {
        inputReference.current?.focus();
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addNotes(note);
        setNote(initialState);
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "input-1") {
            setNote(prevState => {
                return {...prevState, ...{title: e.target.value}};
            });
        }
        else {
            setNote(prevState => {
                return {...prevState, ...{description: e.target.value}};
            });
        }
    }

    const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(prevState => {
            return {...prevState, ...{color: e.target.value}};
        });
    }

    return (
        <div className='take-note-form' style={{backgroundColor: note.color}}>
            <form onBlur={handleOnBlur} className="form-control" onSubmit={submitHandler} >
                <div style={{display: "flex", justifyContent: "space-between", position: 'relative'}}>
                    <input
                        name="input-1"
                        className="input-box" 
                        onFocus={handleOnFocus} 
                        ref={inputReference}
                        placeholder="Title"
                        value={note.title}
                        onChange={changeHandler}
                    />
                    <button className="btn-pin" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setNote(prevState => {
                            return {...prevState, isPinned: !prevState.isPinned};
                        });
                    }}>
                        <i className={`fas fa-thumbtack ${note.isPinned ? "active" : ""}`}></i>
                    </button>
                </div>
                {
                    show &&
                    <div style={{display: "flex", flexDirection: 'column', alignItems: 'flex-end'}}>
                        <input
                            style={{ width: '100%'}}
                            autoFocus
                            required
                            name="content"
                            placeholder="Take a note..."
                            className="input-box content"
                            onBlur={handleOnBlur2}
                            value={note.description}
                            onChange={changeHandler}
                        />
                        <div style={{display: 'flex', alignItems: 'flex-end'}}>
                            <input type="color" id="color" value={note.color} className="color-btn" title="Choose color of the Note" onChange={colorHandler}/>
                            <button type="submit" className='btn-submit'>Submit</button>
                        </div>
                    </div>
                }
            </form>
        </div>
    );
};

export default Input;