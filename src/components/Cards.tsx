import React from 'react';
import { Action } from '../state/actions';
import { Dispatch } from 'redux';
import { Note } from '../state/interfaces';
import './Input.css'; 
import { InputProps } from './Input';
import './Cards.css'

interface CardsProps extends InputProps {
    deleteNotes: (note: Note) => (dispatch: Dispatch<Action>) => void;
    notes: Note[];
    isPinned: boolean;
}

const Cards = (props: CardsProps) => {
    const { deleteNotes, notes, isPinned, addNotes } = props;

    const clickHandler = (title: string | undefined, description: string, isPinned: boolean, color: string) => {
        deleteNotes({
            title: title,
            description: description,
            isPinned: isPinned,
            color: color
        });
    }

    const pinHandler = (title: string | undefined, description: string, isPinned: boolean, color: string ) => {
        addNotes({
            title: title,
            description: description,
            isPinned: isPinned,
            color: color,
            makePinned: !isPinned,
        })
    }

    const colorHandler = (e: React.ChangeEvent<HTMLInputElement>, title: string | undefined, description: string, isPinned: boolean, color: string ) => {
        addNotes({
            title: title,
            description: description,
            isPinned: isPinned,
            color: color,
            newColor: e.target.value,
        })
    }

    return (
        <>
            {
                notes.filter(note => note.isPinned === isPinned).length ?
                <>
                    <h2 style={{color: "white", paddingTop: "34px"}}>{isPinned ? "PINNED": "OTHERS"}</h2>
                    <div className="cards">
                        {notes.map((note) => {
                            if (note.isPinned !== isPinned) return;
                            return (
                                <>
                                    <div className="card" key={note.description} style={{backgroundColor: note.color}}>
                                        <div className='header'>
                                            <h4><b>{note.title}</b></h4>
                                            <button className='btn-pin' onClick={() => pinHandler(note.title, note.description, note.isPinned, note.color)}>
                                                <i className={`fas fa-thumbtack ${note.isPinned ? "active" : ""}`}></i>
                                            </button>
                                        </div>
                                        <p>{note.description}</p>
                                        <input style={{position: "relative", top: "3px"}}type="color" id="color" value={note.color} className="color-btn" title="Choose color of the Note" onChange={(e: React.ChangeEvent<HTMLInputElement>) => colorHandler(e, note.title, note.description, note.isPinned, note.color)}/>
                                        <button className='btn-delete' 
                                        style={{position: "relative", left: "30px"}}
                                        onClick={() => clickHandler(note.title, note.description, note.isPinned, note.color)}>
                                            Delete
                                        </button>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </> : <></>
            }
        </>
    );
};

export default Cards;
